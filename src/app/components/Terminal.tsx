"use client";

import React from "react";
import { useTheme } from "../context/ThemeContext";

const Terminal = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-300 bg-gray-900 dark:bg-black text-green-400 dark:text-green-300 px-4">
      <div className="w-full max-w-2xl bg-black border border-green-400 rounded p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">user@jetross:~</span>
          <button
            onClick={toggleTheme}
            className="text-green-500 hover:text-green-300 text-xs"
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>
        <div className="text-md">
          <p>$ whoami</p>
          <p>Jetross Galinato</p>
          <p className="mt-2">$ echo "Welcome to my portfolio!"</p>
          <p>Welcome to my portfolio!</p>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
