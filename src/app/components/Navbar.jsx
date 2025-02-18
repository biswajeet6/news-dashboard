"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center shadow-md mb-0">
      <h1 className="text-white text-lg sm:text-2xl font-bold">Dashboard</h1>


      <div className="flex items-center gap-4">
        <DarkModeToggle />

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-white focus:outline-none"
          >
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Profile"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-white text-sm sm:text-base">
              {session?.user?.name || "Profile"}
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-gray-800 text-white rounded-lg shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
