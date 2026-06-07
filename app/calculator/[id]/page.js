import { notFound } from "next/navigation";
import Link from "next/link";
import { calculators, getCalculatorById } from "@/lib/calculators";
import CalculatorEngine from "@/components/CalculatorEngine";
import MarkRecent from "@/components/MarkRecent";

const BASE_URL = "https://calc.tools";

// ── Static generation ────────────────────────────────────────────────────────
// Tells Next.js to pre-render every calculator page at build time
export function generateStaticParams() {
  return calculators.map((c) => ({ id: c.id }));
}

// ── Per-page metadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { id } = await params;
  const config = getCalculatorById(id);
  if (!config) return {};

  const title = `${config.name} — Free Online Calculator`;
  const description = `Use the free ${config.name} online. ${config.description}. No sign-up required.`;
  const url = `${BASE_URL}/calculator/${config.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function CalculatorPage({ params }) {
  const { id } = await params;
  const config = getCalculatorById(id);
  if (!config) notFound();

  const url = `${BASE_URL}/calculator/${config.id}`;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: config.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: config.description,
    url,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: config.category,
        item: `${BASE_URL}/#${config.category}`,
      },
      { "@type": "ListItem", position: 3, name: config.name, item: url },
    ],
  };

  return (
    <>
      {/* Structured data — in the HTML at build time */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Mark this calculator as recently visited (client-side only) */}
      <MarkRecent id={config.id} />

      <article aria-labelledby="calc-title">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm list-none p-0 m-0">
            <li>
              <Link href="/" className="text-gray-400 hover:text-gray-900 transition-colors">
                All
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-200">›</li>
            <li>
              <span className="text-gray-400">{config.category}</span>
            </li>
            <li aria-hidden="true" className="text-gray-200">›</li>
            <li>
              <span className="text-gray-900 font-medium" aria-current="page">
                {config.name}
              </span>
            </li>
          </ol>
        </nav>

        {/* Title */}
        <header className="mb-6">
          <h1 id="calc-title" className="text-2xl font-bold text-gray-900">
            {config.name}
          </h1>
          <p className="text-sm text-gray-400 mt-1">{config.description}</p>
        </header>

        {/* Interactive engine — client component */}
        <CalculatorEngine id={config.id} />
      </article>
    </>
  );
}
