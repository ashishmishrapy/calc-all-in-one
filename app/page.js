import Link from "next/link";
import { calculators, categories, getCalculatorsByCategory } from "@/lib/calculators";
import RecentCalculators from "@/components/RecentCalculators";

export const metadata = {
  title: "Free Online Calculators — Finance, Health, Math & More",
  description:
    "Free online calculators for EMI, SIP, BMI, GST, age, tip, unit conversion and more. Fast, minimal, no ads.",
  alternates: { canonical: "https://calc.tools/" },
  openGraph: {
    title: "Free Online Calculators — Finance, Health, Math & More",
    description:
      "Free online calculators for EMI, SIP, BMI, GST, age, tip, unit conversion and more. Fast, minimal, no ads.",
    url: "https://calc.tools/",
  },
};

// JSON-LD for the homepage
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Calc",
  url: "https://calc.tools",
  description:
    "Free online calculators for finance, health, math, unit conversion, and everyday use.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://calc.tools/calculator/{search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "All Calculators",
  numberOfItems: calculators.length,
  itemListElement: calculators.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    url: `https://calc.tools/calculator/${c.id}`,
  })),
};

export default function HomePage() {
  return (
    <>
      {/* Structured data — rendered server-side, Google reads it instantly */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="space-y-8">
        {/* Recent — client component, reads cookie */}
        <RecentCalculators />

        {/* Categories — server rendered */}
        {categories.map((cat) => {
          const items = getCalculatorsByCategory(cat);
          return (
            <section key={cat} aria-labelledby={`cat-${cat}`}>
              <h2
                id={`cat-${cat}`}
                className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3"
              >
                <Link
                  href={`/category/${cat.toLowerCase()}`}
                  className="hover:text-gray-700 transition-colors"
                >
                  {cat}
                </Link>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {items.map((c) => (
                  <Link
                    key={c.id}
                    href={`/calculator/${c.id}`}
                    className="group border border-gray-100 rounded-lg px-4 py-3 hover:border-gray-900 hover:bg-gray-50 transition-all"
                    aria-label={`${c.name} — ${c.description}`}
                  >
                    <p className="text-sm font-medium text-gray-900 group-hover:text-black">
                      {c.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-tight line-clamp-1">
                      {c.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
