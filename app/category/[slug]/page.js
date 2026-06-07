import { notFound } from "next/navigation";
import Link from "next/link";
import { calculators, categories, getCalculatorsByCategory } from "@/lib/calculators";

const BASE_URL = "https://calc.tools";

// Map slug → display name (slug is lowercase version of category)
const slugToCategory = (slug) =>
  categories.find((c) => c.toLowerCase() === slug.toLowerCase());

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.toLowerCase() }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = slugToCategory(slug);
  if (!cat) return {};

  const items = getCalculatorsByCategory(cat);
  const title = `${cat} Calculators — Free Online Tools`;
  const description = `${items.length} free online ${cat.toLowerCase()} calculators. ${items.map((c) => c.name).slice(0, 5).join(", ")} and more. No sign-up required.`;
  const url = `${BASE_URL}/category/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const categoryIntros = {
  Finance: "Finance calculators help you make smarter money decisions. Whether you're planning a loan, investing in mutual funds, or calculating tax, these tools give you instant, accurate answers. All calculators are free with no sign-up required.",
  Health: "Health calculators give you data-driven insights into your body and fitness. From BMI and calorie tracking to ideal weight and hydration, use these tools to set realistic health goals.",
  Math: "Math calculators handle everyday arithmetic quickly and accurately. Percentages, averages, ratios, discounts — get instant results without doing the math manually.",
  Converter: "Unit converters make it easy to switch between measurement systems. Length, weight, temperature, and speed — convert any value instantly between metric and imperial units.",
  Education: "Education calculators help students and teachers track academic performance. Convert CGPA to percentage, calculate weighted grades, and understand your academic standing.",
  Everyday: "Everyday calculators solve common day-to-day problems. Calculate your age, find the difference between dates, split a restaurant bill, or estimate your fuel cost for a trip.",
};

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const cat = slugToCategory(slug);
  if (!cat) notFound();

  const items = getCalculatorsByCategory(cat);
  const url = `${BASE_URL}/category/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: `${cat} Calculators`, item: url },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cat} Calculators`,
    numberOfItems: items.length,
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${BASE_URL}/calculator/${c.id}`,
    })),
  };

  const intro = categoryIntros[cat] || `Free online ${cat.toLowerCase()} calculators. Fast, accurate, no sign-up required.`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm list-none p-0 m-0">
            <li>
              <Link href="/" className="text-gray-400 hover:text-gray-900 transition-colors">
                All Calculators
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-200">›</li>
            <li>
              <span className="text-gray-900 font-medium" aria-current="page">
                {cat}
              </span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {cat} Calculators
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{intro}</p>
        </header>

        {/* Calculator grid */}
        <section aria-label={`${cat} calculator list`}>
          <p className="text-xs text-gray-400 mb-3">{items.length} calculators</p>
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
                <p className="text-xs text-gray-400 mt-0.5 leading-tight line-clamp-2">
                  {c.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Other categories */}
        <section aria-labelledby="other-cats">
          <h2
            id="other-cats"
            className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3"
          >
            Other Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories
              .filter((c) => c !== cat)
              .map((c) => (
                <Link
                  key={c}
                  href={`/category/${c.toLowerCase()}`}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-full text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all"
                >
                  {c}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
