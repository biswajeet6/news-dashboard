"use client";

import { useState } from "react";

export default function Sidebar({ activeView, setActiveView }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (view) => {
    setActiveView(view);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-16 right-4 z-50 p-2 rounded-md bg-gray-800 text-white"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

            <div className={`
        fixed top-0 left-0 h-screen bg-gray-800 text-white z-40
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64
      `}>
        <div className="h-full p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-6">NewsDuniya</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNavClick("home")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeView === "home" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("payout")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeView === "payout" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                Payout
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("payout-details")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeView === "payout-details" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                Payout Details
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("export")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeView === "export" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                Export
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("analytics")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeView === "analytics" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                Analytics
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}