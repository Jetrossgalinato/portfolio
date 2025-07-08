"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Terminal = () => {
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<React.ReactNode[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const historyIndex = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const command = input.trim();

      const newHistory: React.ReactNode[] = [
        ...history,
        <span key={Date.now()} className="text-green-600 dark:text-green-400">
          <span className="mr-2 font-bold select-none">user@guest:~$</span>
          {command}
        </span>,
      ];

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
          "* Jetross Axle Galinato – Full-Stack Web Developer with a strong focus on backend systems",
          "* Based in the Philippines",
          "* 3+ years of experience in backend development (APIs, databases, authentication)",
          "* 1+ year of experience in full-stack development using modern frameworks",
          "* Tech-stack: Python, Django, PHP, Laravel, Reactjs, Next.js, TypeScript, PostgreSQL, MySQL"
        );
      } else if (command === "/projects") {
        newHistory.push(
          "1. OJT Attendance System",
          "2. Palengke Ordering App",
          "3. Portfolio Terminal Site"
        );
      } else if (command === "/contact") {
        newHistory.push(
          <span key="github">
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
          <span key="email">
            Email:{" "}
            <a
              href="mailto:jetrossgalinato@gmail.com"
              className="hover:underline"
            >
              jetrossgalinato@gmail.com
            </a>
          </span>,
          <span key="linkedin">
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
        setCommandHistory([]);
        setInput("");
        historyIndex.current = null;
        return;
      } else {
        newHistory.push(`Command not found: ${command}`);
      }

      setHistory(newHistory);
      setCommandHistory((prev) => [...prev, command]);
      setInput("");
      historyIndex.current = null;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex =
        historyIndex.current === null
          ? commandHistory.length - 1
          : Math.max(historyIndex.current - 1, 0);

      historyIndex.current = newIndex;
      setInput(commandHistory[newIndex] || "");
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex.current === null) return;

      const newIndex = Math.min(
        historyIndex.current + 1,
        commandHistory.length
      );
      historyIndex.current = newIndex;

      if (newIndex === commandHistory.length) {
        setInput("");
        historyIndex.current = null;
      } else {
        setInput(commandHistory[newIndex] || "");
      }
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
      <div className="w-full max-w-2xl h-[500px] shadow-xl border border-green-400 rounded p-4 font-mono bg-white dark:bg-black text-green-600 dark:text-green-400 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold">user@jetross:~</span>
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
          <div className="font-bold">
            <p>$ whoami</p>
            <p>Jetross Axle Galinato</p>
            <p>Welcome to my portfolio!</p>
          </div>
          {history.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        <div className="flex items-center border-t border-green-400 pt-2">
          <span className="mr-2 select-none text-sm font-bold text-green-700 dark:text-green-400">
            user@guest:~$
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none border-none text-green-700 text-sm dark:text-green-400 placeholder:text-green-500 dark:placeholder:text-green-600"
            placeholder="Type a command..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
