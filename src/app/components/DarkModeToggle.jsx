"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; 

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 transition-all"
    >
      {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-500" />}
    </button>
  );
}
