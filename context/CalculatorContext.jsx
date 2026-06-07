"use client";
import { createContext, useContext, useState } from "react";

const COOKIE_KEY = "calc_recent";
const COOKIE_DAYS = 365;

function readCookie() {
  if (typeof document === "undefined") return [];
  try {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(COOKIE_KEY + "="));
    return match ? JSON.parse(decodeURIComponent(match.split("=")[1])) : [];
  } catch {
    return [];
  }
}

function writeCookie(value) {
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DAYS);
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(
    JSON.stringify(value)
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function deleteCookie() {
  document.cookie = `${COOKIE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const CalculatorContext = createContext(null);

export function CalculatorProvider({ children }) {
  const [recentIds, setRecentIds] = useState(() => readCookie());

  const markRecent = (id) => {
    setRecentIds((prev) => {
      const updated = [id, ...prev.filter((r) => r !== id)].slice(0, 5);
      writeCookie(updated);
      return updated;
    });
  };

  const clearRecent = () => {
    setRecentIds([]);
    deleteCookie();
  };

  return (
    <CalculatorContext.Provider value={{ recentIds, markRecent, clearRecent }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculatorContext() {
  return useContext(CalculatorContext);
}
