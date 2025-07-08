"use client";

import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Terminal = () => {
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setHistory([...history, `$ ${input}`]);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-300 bg-[var(--background)] text-white px-4">
      <div className="w-full max-w-2xl border border-green-400 rounded p-4 font-mono bg-green-700 dark:bg-black text-white dark:text-green-500">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">user@jetross:~</span>
          <button
            onClick={toggleTheme}
            className="text-xs border px-2 py-1 border-green-500 hover:bg-green-200 hover:text-black transition"
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>

        <div className="text-md space-y-2 mb-4">
          <p>$ whoami</p>
          <p>Jetross Galinato</p>
          <p>$ echo &quot;Welcome to my portfolio!&quot;</p>
          <p>Welcome to my portfolio!</p>
          {history.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        <div className="flex items-center">
          <span className="mr-2 select-none">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none border-none placeholder:text-gray-100 dark:placeholder:text-green-400"
            placeholder="Type a command..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
