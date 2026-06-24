import { FaBan, FaCalendar, FaEye, FaTrash, FaUserCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export interface UserActivity {
  type: "host" | "attend";
  details: number;
};

export interface UserInformation {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  country: string;
  region: string;
  city: string;
  role: "user" | "admin";
  activity?: UserActivity;
  profile_image?: string;
};

function AdminUserRow({
  id, username, first_name, last_name, email, contact_number, 
  country, region, city, role, activity,
  profile_image="https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}: UserInformation) {
  return (
    <tr className="align-middle">
      {/* user information */}
      <td>
        <div className="flex items-center gap-4 px-8">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={profile_image}
          />
          <div className="flex flex-col">
            <p className="text-sub-1 font-bold">{first_name + " " + last_name}</p>
            <p className="text-sub-1 text-gray-500 font-mono">{username}</p>
          </div>
        </div>
      </td>

      <td className="text-center font-mono">{email}</td>

      <td className="text-center font-mono">{contact_number}</td>

      <td>
        <div className="flex flex-col text-sub-1 justify-center px-4">
          <p className="font-bold">{city}</p>
          <p>{region}</p>
          <p>{country}</p>
        </div>         
      </td>

      <td>
        <p
        className={`text-sub-1 py-0.5 px-1 text-center rounded font-mono ${
          role === "user"
          ? "bg-green-200 text-green-700"
          : "bg-blue-200 text-blue-700"
        }`}
        >
        {role.toUpperCase()}
        </p>
      </td>

      <td>
        <div className="flex gap-2 items-center justify-center">
        {
          (activity?.type == "host") ? 
            <FaCalendar />:
          (activity?.type == "attend") ? 
            <FaUserCheck /> :
            <FaBan />
        }
        {
          (activity?.type == "host") ? 
            <p>{activity.details} hosted</p>:
          (activity?.type == "attend") ? 
            <p>{activity.details} attended</p>:
            <p>No activity</p>
        }
        </div>
      </td>

      <td>
          <div className="flex gap-4 items-center justify-center">
          <FaEye />
          <FaPencil />
          <FaTrash />
          </div>
      </td>
    </tr>
  )
}

export default AdminUserRow;