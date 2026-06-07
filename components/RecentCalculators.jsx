"use client";
import Link from "next/link";
import { calculators } from "@/lib/calculators";
import { useCalculatorContext } from "@/context/CalculatorContext";

export default function RecentCalculators() {
  const { recentIds, clearRecent } = useCalculatorContext();
  const recents = recentIds
    .map((id) => calculators.find((c) => c.id === id))
    .filter(Boolean);

  if (recents.length === 0) return null;

  return (
    <section aria-label="Recently used calculators">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Recent
        </h2>
        <button
          onClick={clearRecent}
          className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Clear recent calculators"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {recents.map((c) => (
          <Link
            key={c.id}
            href={`/calculator/${c.id}`}
            className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
