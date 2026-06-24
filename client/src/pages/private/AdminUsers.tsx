import Button from "@/components/Button";
import { useState } from "react";
import { FaPlus, FaSearch} from "react-icons/fa";
import AdminUserRow, { type UserInformation, type UserActivity} from "./AdminUserRow";

function AdminPage() {
  const [search, setSearch] = useState("");
  const [userType, setUserType] = useState("all");
  const userTypes = [
    "all", "host", "attendee",
  ];
  const [userRole, _setUserRole] = useState("user");

  const [users, _setUsers] = useState<UserInformation[]>(
    [
      {
        id: 1,
        username: "deez_nuts",
        first_name: "Karl",
        last_name: "Logdat",
        email: "logdatk@gmail.com",
        contact_number: "09083246090",
        country: "Philippines",
        region: "NCR",
        city: "Taguig",
        role: "admin",
        activity: {
          type: "host",
          details: 4
        },
        profile_image: "https://images.unsplash.com/photo-1771124857054-f4380abd1408?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 2,
        username: "shigetora",
        first_name: "Juan",
        last_name: "Dela Cruz",
        email: "cook_easy@gmail.com",
        contact_number: "09087276090",
        country: "Philippines",
        region: "Region 5",
        city: "Legazpi",
        role: "user",
        profile_image: "https://images.unsplash.com/photo-1778165657501-558e29e5e0c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 2,
        username: "shigetora",
        first_name: "Juan",
        last_name: "Dela Cruz",
        email: "cook_easy@gmail.com",
        contact_number: "09087276090",
        country: "Philippines",
        region: "Region 5",
        city: "Legazpi",
        role: "user",
        activity: {
          type: "attend",
          details: 10
        },
      }
    ]
  )

  return (
    <div className="flex flex-col h-full">
      { /* title and user creation */}
      <div className="flex">
        <div className='mb-4 flex-1'>
          <h1 className="text-heading-1">Users</h1>
          <p className='text-sub-1 text-gray-500'>Users table • Full CRUD access</p>
        </div>
        <Button 
          bgColorClass="bg-[#C2313C]"
          className="my-3 px-6 flex items-center gap-2 rounded-md text-body-1"
        >
          <FaPlus />
          Add User
        </Button>
      </div>

      {/* search and filter */}
      <div className="flex w-full items-center gap-2">
        <div className="flex items-center flex-1 border border-gray-300 rounded-md p-2 gap-2">
          <FaSearch className="text-gray-300" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              focus:outline-none
            "
          />
        </div>

        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
        >
          {userTypes.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full table-fixed my-8 border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="w-64">USER</th>
            <th className="text-center">EMAIL</th>
            <th className="text-center">CONTACT</th>
            <th className="text-center">LOCATION</th>
            <th className="text-center w-16">ROLE</th>
            <th className="text-center">ACTIVITY</th>
            <th className="text-center w-24">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => (
              <AdminUserRow
                id={user.id}
                username={user.username}
                first_name={user.first_name}
                last_name={user.last_name}
                email={user.email}
                contact_number={user.contact_number}
                country={user.country}
                region={user.region}
                city={user.city}
                role={user.role}
                activity={user.activity}
                profile_image={user.profile_image}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default AdminPage;