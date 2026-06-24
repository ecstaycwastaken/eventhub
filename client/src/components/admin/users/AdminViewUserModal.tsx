import { useEffect } from 'react';
import { useHttp } from '@/hooks';
import type { GetUserByIdResponse } from '@/types/response';
import Button from '@/components/Button';
import heroBG from '@/assets/hero-bg.png';

interface AdminViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

export default function AdminViewUserModal({ isOpen, onClose, userId }: AdminViewUserModalProps) {
  const { data, loading, error, sendRequest: getUser, reset } = useHttp<GetUserByIdResponse>();
  const user = data?.user;

  useEffect(() => {
    if (isOpen && userId) {
      reset(); // Clear old data before fetching new data to prevent flashing
      getUser({
        method: 'GET',
        url: `/api/v1/user/${userId}`,
      }).catch(() => {
        // Error is handled by useHttp
      });
    } else {
      reset();
    }
  }, [isOpen, userId, getUser, reset]);

  if (!isOpen) return null;

  const getInitials = (first?: string, last?: string) => {
    return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase() || "U";
  };

  const locationStr = [user?.city, user?.region, user?.country].filter(Boolean).join(', ') || '—';

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
            {user?.profile_image ? (
              <img 
                src={user.profile_image} 
                alt={user.username} 
                className="w-20 h-20 rounded-full border-4 border-white object-cover bg-white"
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-4 border-white bg-primary text-white flex items-center justify-center text-heading-2 font-bold shrink-0 shadow-sm">
                {user ? getInitials(user.first_name, user.last_name) : 'U'}
              </div>
            )}
            <div className="flex flex-col flex-1 mb-1">
              <h2 className="text-heading-2 text-white leading-tight font-bold">
                {user ? `${user.first_name} ${user.last_name}` : 'Loading...'}
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
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col bg-[#F9FAFB] p-4 rounded-2xl border border-[#F3F4F6]">
                  <p className="text-sub-1 font-bold text-gray-500 tracking-wider mb-1">EMAIL</p>
                  <p className="font-bold text-gray-900 text-body-1 truncate" title={user.email}>{user.email}</p>
                </div>
                <div className="flex flex-col bg-[#F9FAFB] p-4 rounded-2xl border border-[#F3F4F6]">
                  <p className="text-sub-1 font-bold text-gray-500 tracking-wider mb-1">ROLE</p>
                  <p className="font-bold text-gray-900 text-body-1 capitalize">{user.role}</p>
                </div>
                <div className="flex flex-col bg-[#F9FAFB] p-4 rounded-2xl border border-[#F3F4F6]">
                  <p className="text-sub-1 font-bold text-gray-500 tracking-wider mb-1">CONTACT</p>
                  <p className="font-bold text-gray-900 text-body-1">{user.contact_number || '—'}</p>
                </div>
                <div className="flex flex-col bg-[#F9FAFB] p-4 rounded-2xl border border-[#F3F4F6]">
                  <p className="text-sub-1 font-bold text-gray-500 tracking-wider mb-1">LOCATION</p>
                  <p className="font-bold text-gray-900 text-body-1 line-clamp-2">{locationStr}</p>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Action Footer */}
        <div className="p-5 border-t border-gray-100 flex gap-3 bg-white shrink-0">
          <Button
            bgColorClass="bg-white"
            textColorClass="text-ink"
            className="flex flex-1 justify-center items-center gap-2 text-button-lg w-full rounded-2xl py-3 border border-border-strong hover:bg-gray-50 shadow-sm"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
