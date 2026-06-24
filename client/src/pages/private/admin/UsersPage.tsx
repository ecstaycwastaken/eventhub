import { useState, useEffect, useMemo, useCallback } from "react";
import { AdminUsersFilter, AdminUsersTable } from "@/components/admin/users";
import { PageHeader } from "@/components/admin";
import { useHttp, useDebounce } from "@/hooks";
import type { GetAllUsersResponse } from "@/types/response";
import type { User } from "@/types/user";

function AdminPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [role, setRole] = useState("all");

  const { 
    loading: usersLoading, 
    error: usersError, 
    sendRequest: getUsers,
    data: usersResponse
  } = useHttp<GetAllUsersResponse>();

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
      />
    </div>
  );
}

export default AdminPage;