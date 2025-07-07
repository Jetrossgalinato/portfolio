"use client";

import React from "react";
import { useTheme } from "../context/ThemeContext";

const Terminal = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-300 bg-[var(--background)] text-[var(--foreground)] dark:text-green-400 px-4">
      <div className="w-full max-w-2xl border border-[var(--foreground)] dark:border-green-400 rounded p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">user@jetross:~</span>
          <button
            onClick={toggleTheme}
            className="text-xs border px-2 py-1 border-[var(--foreground)] dark:border-green-400 hover:bg-[var(--foreground)] hover:text-[var(--background)] dark:hover:bg-green-400 dark:hover:text-black transition"
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>
        <div className="text-md space-y-2">
          <p>$ whoami</p>
          <p>Jetross Galinato</p>
          <p>$ echo &quot;Welcome to my portfolio!&quot;</p>
          <p>Welcome to my portfolio!</p>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
