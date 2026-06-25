import { FaTrash, FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import type { User } from "@/types/user";

interface UserRowProps {
  user: User;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function UserRow({ user, onView, onEdit, onDelete }: UserRowProps) {
  const isUser = user.role === "user";

  const getInitials = (first: string, last: string) => {
    return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase() || "U";
  };

  return (
    <tr className="hover:bg-bg-subtle transition-colors group">
      {/* User Information */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {user.profile_image ? (
            <img
              className="w-10 h-10 rounded-full object-cover border border-border"
              src={user.profile_image}
              alt={user.username}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20">
              {getInitials(user.first_name, user.last_name)}
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-body-1 font-bold text-ink">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-sm text-text-secondary">@{user.username}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-body-1 text-ink">{user.email}</td>
      <td className="px-6 py-4 text-body-1 text-ink">{user.contact_number || "—"}</td>
      <td className="px-6 py-4">
        <div className="flex flex-col text-sm text-ink">
          {user.city || user.region || user.country ? (
            <>
              {user.city && <p className="font-medium">{user.city}</p>}
              {user.region && <p className="text-text-secondary">{user.region}</p>}
              {user.country && <p className="text-text-secondary">{user.country}</p>}
            </>
          ) : (
            <p className="text-text-muted">—</p>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <span
          className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-pill text-xs font-semibold uppercase tracking-wide
          ${
            isUser
              ? "bg-success-bg text-success-text"
              : "bg-action-secondary/10 text-action-secondary"
          }`}
        >
          {user.role}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <button 
            className="p-2 text-text-secondary hover:text-ink transition-all hover:cursor-pointer"
            onClick={() => onView(user.id)}
          >
            <FaEye size={14} />
          </button>
          <button 
            className="p-2 text-text-secondary hover:text-action-secondary transition-all hover:cursor-pointer"
            onClick={() => onEdit(user.id)}
          >
            <FaPencil size={14} />
          </button>
          <button 
            className="p-2 text-text-secondary hover:text-danger transition-all hover:cursor-pointer"
            onClick={() => onDelete(user.id)}
          >
            <FaTrash size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}