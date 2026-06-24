import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { AdminUsersFilter, AdminUsersTable, AdminViewUserModal, AdminEditUserModal } from "@/components/admin/users";
import { PageHeader } from "@/components/admin";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import { useHttp, useDebounce } from "@/hooks";
import type { GetAllUsersResponse } from "@/types/response";
import type { User } from "@/types/user";

function AdminPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [role, setRole] = useState("all");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const { 
    loading: usersLoading, 
    error: usersError, 
    sendRequest: getUsers,
    data: usersResponse
  } = useHttp<GetAllUsersResponse>();

  const { sendRequest: deleteUserRequest, loading: isDeletingUser } = useHttp();

  useEffect(() => {
    getUsers({
      method: 'GET',
      url: `/api/v1/user`,
    });
  }, [getUsers]);

  const users = useMemo(() => {
    if (!usersResponse) return [];
    
    // The backend returns all users; we filter them on the client
    let fetchedUsers: User[] = Array.isArray(usersResponse) ? usersResponse : (usersResponse.users || []);

    if (role !== "all") {
      fetchedUsers = fetchedUsers.filter((u) => u.role.toLowerCase() === role.toLowerCase());
    }

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      fetchedUsers = fetchedUsers.filter(
        (u) =>
          u.first_name?.toLowerCase().includes(query) ||
          u.last_name?.toLowerCase().includes(query) ||
          u.username?.toLowerCase().includes(query) ||
          u.email?.toLowerCase().includes(query)
      );
    }

    return fetchedUsers;
  }, [usersResponse, role, debouncedSearch]);

  const handleClearFilters = useCallback(() => {
    setSearch("");
    setRole("all");
  }, [setSearch, setRole]);

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;
    try {
      const response = await deleteUserRequest({
        method: 'DELETE',
        url: `/api/v1/user/${deleteUserId}`
      });
      if (response) {
        toast.success("User deleted successfully!", {
          classNames: {
            toast: 'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
          }
        });
        setDeleteUserId(null);
        getUsers({ method: 'GET', url: `/api/v1/user` });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-full font-dm pb-10">
      <PageHeader 
        title="Users" 
        subtitle="Manage all registered users on the platform"
        total={users.length}
        type="users"
        onCreate={() => {}}
      />

      <AdminUsersFilter 
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
      />

      <AdminUsersTable 
        users={users}
        loading={usersLoading}
        error={usersError}
        onClearFilters={handleClearFilters}
        onViewUser={setSelectedUserId}
        onEditUser={setEditUserId}
        onDeleteUser={setDeleteUserId}
      />

      <AdminViewUserModal 
        userId={selectedUserId} 
        isOpen={!!selectedUserId} 
        onClose={() => setSelectedUserId(null)} 
      />

      <AdminEditUserModal
        userId={editUserId}
        isOpen={!!editUserId}
        onClose={() => setEditUserId(null)}
        onSuccess={() => getUsers({ method: 'GET', url: `/api/v1/user` })}
      />

      <DeleteConfirmationModal
        isOpen={!!deleteUserId}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        isDeleting={isDeletingUser}
        onCancel={() => setDeleteUserId(null)}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
}

export default AdminPage;