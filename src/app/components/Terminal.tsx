"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Terminal = () => {
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<React.ReactNode[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const command = input.trim();
      const newHistory = [...history, `$ ${command}`];

      if (command === "/help") {
        newHistory.push(
          "Available commands:",
          "/about     → Show information about me",
          "/projects  → View list of projects",
          "/contact   → Get my contact information",
          "/clear     → Clear the screen"
        );
      } else if (command === "/about") {
        newHistory.push(
          "Jetross Axle Galinato – Full-Stack Web Developer with a strong focus on backend systems",
          "Based in the Philippines",
          "3+ years of experience in backend development (APIs, databases, authentication)",
          "1+ year of experience in full-stack development using modern frameworks",
          "Skilled in Django, PostgreSQL, REST APIs, React, Next.js, and more",
          "Tech-stack: Python, Django, PHP, Laravel, Reactjs, Next.js, TypeScript, PostgreSQL, MySQL"
        );
      } else if (command === "/projects") {
        newHistory.push(
          "1. OJT Attendance System",
          "2. Palengke Ordering App",
          "3. Portfolio Terminal Site"
        );
      } else if (command === "/contact") {
        newHistory.push(
          <span>
            Github:{" "}
            <a
              href="https://github.com/Jetrossgalinato"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/Jetrossgalinato
            </a>
          </span>,
          <span>
            Email:{" "}
            <a
              href="mailto:jetrossgalinato@gmail.com"
              className="hover:underline"
            >
              jetrossgalinato@gmail.com
            </a>
          </span>,
          <span>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/jetross-galinato-141ba5361/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              linkedin.com/in/jetross-galinato
            </a>
          </span>
        );
      } else if (command === "/clear") {
        setHistory([]);
        setInput("");
        return;
      } else {
        newHistory.push(`Command not found: ${command}`);
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  // Auto-scroll to bottom on history update
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 transition-all duration-300">
      <div className="w-full max-w-2xl h-[500px] border border-green-400 rounded p-4 font-mono bg-green-900 dark:bg-black text-white dark:text-green-500 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">user@jetross:~</span>
          <button
            onClick={toggleTheme}
            className="text-xs border px-2 py-1 border-green-500 hover:bg-green-200 hover:text-black transition"
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>

        {/* Scrollable content area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1 text-sm"
        >
          <p>$ whoami</p>
          <p>Jetross Galinato</p>
          <p>Welcome to my portfolio!</p>
          {history.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        <div className="flex items-center border-t border-green-400 pt-2">
          <span className="mr-2 select-none">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none border-none text-white text-sm dark:text-green-400 placeholder:text-gray-100 dark:placeholder:text-green-500"
            placeholder="Type /help for list of the commands..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
