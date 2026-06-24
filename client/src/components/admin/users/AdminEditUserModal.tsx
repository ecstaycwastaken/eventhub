import { useState, useEffect } from 'react';
import { useHttp } from '@/hooks';
import type { GetUserByIdResponse } from '@/types/response';
import Button from '@/components/Button';
import heroBG from '@/assets/hero-bg.png';

interface AdminEditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  onSuccess: () => void;
}

export default function AdminEditUserModal({ isOpen, onClose, userId, onSuccess }: AdminEditUserModalProps) {
  const { data, loading, error, sendRequest: getUser, reset } = useHttp<GetUserByIdResponse>();
  const { sendRequest: editUser, loading: editing } = useHttp();
  const user = data?.user;

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    contact_number: '',
    city: '',
    region: '',
    country: '',
    role: 'user'
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && userId) {
      reset();
      setSubmitError(null);
      setProfileImage(null);
      setPreviewImage(null);
      getUser({
        method: 'GET',
        url: `/api/v1/user/${userId}`,
      }).then((res) => {
        if (res?.data?.user) {
          const u = res.data.user;
          setFormData({
            first_name: u.first_name || '',
            last_name: u.last_name || '',
            contact_number: u.contact_number || '',
            city: u.city || '',
            region: u.region || '',
            country: u.country || '',
            role: u.role || 'user'
          });
          setPreviewImage(u.profile_image || null);
        }
      });
    } else {
      reset();
    }
  }, [isOpen, userId, getUser, reset]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setSubmitError(null);

    try {
      const dataToSubmit = new FormData();
      dataToSubmit.append('_method', 'PUT'); // Method spoofing for Laravel
      Object.entries(formData).forEach(([key, value]) => {
        dataToSubmit.append(key, value);
      });
      if (profileImage) {
        dataToSubmit.append('profile_image', profileImage);
      }

      await editUser({
        method: 'POST', // Sent as POST but spoofed as PUT
        url: `/api/v1/user/edit/${userId}`,
        data: dataToSubmit,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      onSuccess();
      onClose();
    } catch (err: any) {
      setSubmitError(err.response?.data?.message || err.response?.data?.error || 'Failed to update user. Please try again.');
    }
  };

  const getInitials = (first?: string, last?: string) => {
    return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase() || "U";
  };

  return (
    <div className="fixed font-dm inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-6 overflow-hidden">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[95vh] overflow-hidden animate-in fade-in duration-200">
        
        {/* Header Region */}
        <div className="relative h-48 w-full shrink-0 bg-gray-100">
          <img
            src={heroBG}
            alt="User Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
          
          <Button
            bgColorClass="bg-white/10"
            className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-white/20 transition-colors"
            onClick={onClose}
          >
            &times;
          </Button>

          {/* User Info Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 flex items-end gap-4">
            <div className="relative group cursor-pointer">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt={user?.username || 'User'} 
                  className="w-20 h-20 rounded-full border-4 border-white object-cover bg-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-4 border-white bg-primary text-white flex items-center justify-center text-heading-2 font-bold shrink-0 shadow-sm">
                  {user ? getInitials(user.first_name, user.last_name) : 'U'}
                </div>
              )}
              <label htmlFor="profile-upload" className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-xs font-semibold">Change</span>
              </label>
              <input 
                id="profile-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange} 
              />
            </div>
            
            <div className="flex flex-col flex-1 mb-1">
              <h2 className="text-heading-2 text-white leading-tight font-bold">
                Edit User
              </h2>
              {user && (
                <p className="text-white/80 font-medium text-body-1">@{user.username}</p>
              )}
            </div>
          </div>
        </div>

        {/* Content Region */}
        <div className="p-6 flex-1 overflow-y-auto">
          {loading && !user ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-10 text-danger">
              <p>{error.message || 'Failed to load user details.'}</p>
            </div>
          ) : user ? (
            <form id="edit-user-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              {submitError && (
                <div className="bg-danger/10 border border-danger/30 text-danger px-4 py-3 rounded-xl text-sm mb-2">
                  {submitError}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="first_name" className="text-sm font-medium text-text-secondary">First Name</label>
                  <input 
                    type="text" 
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="last_name" className="text-sm font-medium text-text-secondary">Last Name</label>
                  <input 
                    type="text" 
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact_number" className="text-sm font-medium text-text-secondary">Contact Number</label>
                  <input 
                    type="text" 
                    id="contact_number"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="role" className="text-sm font-medium text-text-secondary">Role</label>
                  <select 
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange as unknown as React.ChangeEventHandler<HTMLSelectElement>}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="city" className="text-sm font-medium text-text-secondary">City</label>
                  <input 
                    type="text" 
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="region" className="text-sm font-medium text-text-secondary">Region / State</label>
                  <input 
                    type="text" 
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="country" className="text-sm font-medium text-text-secondary">Country</label>
                <input 
                  type="text" 
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </form>
          ) : null}
        </div>

        {/* Action Footer */}
        <div className="p-5 border-t border-gray-100 flex gap-3 bg-white shrink-0">
          <Button
            bgColorClass="bg-white"
            textColorClass="text-ink"
            className="flex flex-1 justify-center items-center gap-2 text-button-lg w-full rounded-2xl py-3 border border-border-strong hover:bg-gray-50 shadow-sm"
            onClick={onClose}
            disabled={editing}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-user-form"
            bgColorClass="bg-primary"
            textColorClass="text-white"
            className="flex flex-1 justify-center items-center gap-2 text-button-lg w-full rounded-2xl py-3 border border-transparent shadow-raised hover:bg-primary-hover transition-colors"
            disabled={editing || !user}
          >
            {editing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
