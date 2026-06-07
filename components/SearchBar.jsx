"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { calculators } from "@/lib/calculators";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  const filtered =
    query.trim().length > 0
      ? calculators.filter(
          (c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.category.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const go = (id) => {
    setQuery("");
    setOpen(false);
    router.push(`/calculator/${id}`);
  };

  return (
    <div ref={ref} className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder="Search calculators…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        aria-label="Search calculators"
        aria-expanded={open && filtered.length > 0}
        aria-haspopup="listbox"
        role="combobox"
        className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-300 transition-all"
      />
      {open && filtered.length > 0 && (
        <ul
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
        >
          {filtered.map((c) => (
            <li key={c.id} role="option">
              <button
                onClick={() => go(c.id)}
                className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center justify-between group"
              >
                <span className="text-sm text-gray-900">{c.name}</span>
                <span className="text-xs text-gray-400 group-hover:text-gray-600">
                  {c.category}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
