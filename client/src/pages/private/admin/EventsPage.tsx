import Button from "@/components/Button";
import { useState } from "react";
import { FaClock, FaEye, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { FaLocationDot, FaPencil, FaPesoSign } from "react-icons/fa6";

function AdminEvents() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all")
  const categories = [
    "all",
    "music",
    "technology",
    "sports",
    "arts & culture",
    "food & drinks",
    "business",
  ]
  
  return (
    <div className="flex flex-col h-full">
      {/* title and event creation */}
      <div className="flex">
        <div className='mb-4 flex-1'>
          <h1 className="text-heading-1">Events</h1>
          <p className='text-sub-1 text-gray-500'>Events table • Full CRUD access</p>
        </div>
        <Button 
          bgColorClass="bg-[#C2313C]"
          className="my-3 px-6 flex items-center gap-2 rounded-md text-body-1"
        >
          <FaPlus />
          Create Event
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* events container */}
      <div className="grid grid-cols-3 my-4 gap-4">
        <div className="overflow-hidden flex flex-col border border-gray-300 rounded-md h-96">
          <img 
            className="h-32 object-cover border-b border-gray-300"
            src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />

          <div
            className="p-4 flex flex-col flex-3"
          >
            <h2 className="text-heading-3">Get together</h2>
            <p className="text-sub-2 text-gray-500">
              Three-day outdoor festival featuring local and international acts across multiple stages.
            </p>

            <div className="flex flex-col my-4 gap-2">
              <div className="flex gap-2">
                <FaClock className="text-gray-500" />
                <p className="text-sub-2 text-gray-500">Jul 12, 2026 • 6:00 PM</p>
              </div>
              <div className="flex gap-2">
                <FaLocationDot className="text-gray-500" />
                <p className="text-sub-2 text-gray-500">Rizal Park, Manila</p>
              </div>
              <div className="flex gap-2">
                <FaPesoSign className="text-gray-500" />
                <p className="text-sub-2 text-gray-500">1,000</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sub-2 text-gray-500">3842 / 5000 attendees</p>
              <p className="text-sub-2 text-gray-500">77%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className={`bg-[#C2313C] h-2.5 rounded-full w-3842/5000`}></div>
            </div>
          </div>

          <div
            className="flex flex-1 w-full items-center justify-around border-t border-gray-300"
          >
            <button className="flex items-center justify-center gap-2 h-full w-full hover:bg-gray-200">
              <FaEye />
              View
            </button>
            <button className="flex items-center justify-center gap-2 h-full w-full border-x border-gray-300 hover:bg-gray-200">
              <FaPencil />
              Edit
            </button>
            <button className="flex items-center justify-center gap-2 h-full w-full hover:bg-gray-200">
              <FaTrash />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminEvents;