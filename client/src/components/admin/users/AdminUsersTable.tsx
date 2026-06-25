import Button from "@/components/Button";
import UserRow from "./AdminUserRow";
import type { User } from "@/types/user";

interface AdminUsersTableProps {
  users: User[];
  loading: boolean;
  error: { message?: string } | null;
  onClearFilters: () => void;
  onViewUser: (id: string) => void;
  onEditUser: (id: string) => void;
  onDeleteUser: (id: string) => void;
}

export default function AdminUsersTable({
  users,
  loading,
  error,
  onClearFilters,
  onViewUser,
  onEditUser,
  onDeleteUser,
}: AdminUsersTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 bg-white rounded-xl border border-border">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 bg-white rounded-xl border border-border">
        <p className="text-danger text-body-1">{error.message || "Failed to load users"}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-bg-subtle rounded-xl border border-dashed border-border-strong">
        <p className="text-text-secondary text-body-1 font-medium">No users found matching your criteria.</p>
        <Button 
          bgColorClass="bg-white" 
          textColorClass="text-ink"
          className="mt-4 border border-border-strong rounded-lg px-4 py-2 hover:bg-gray-50 text-button-sm font-semibold shadow-resting"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border shadow-resting overflow-hidden">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-200">
          <thead>
            <tr className="bg-bg-subtle border-b border-border text-xs uppercase tracking-wider text-text-muted font-medium">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 text-center">Role</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <UserRow key={user.id} user={user} onView={onViewUser} onEdit={onEditUser} onDelete={onDeleteUser} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
