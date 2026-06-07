import { notFound } from "next/navigation";
import Link from "next/link";
import { calculators, getCalculatorById } from "@/lib/calculators";
import CalculatorEngine from "@/components/CalculatorEngine";
import MarkRecent from "@/components/MarkRecent";

const BASE_URL = "https://calc.tools";

// ── Static generation ────────────────────────────────────────────────────────
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
    openGraph: {
      title,
      description,
      url,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function CalculatorPage({ params }) {
  const { id } = await params;
  const config = getCalculatorById(id);
  if (!config) notFound();

  const url = `${BASE_URL}/calculator/${config.id}`;
  const content = config.content || null;

  // Related calculators (up to 4)
  const relatedIds = content?.related || [];
  const related = relatedIds
    .map((rid) => calculators.find((c) => c.id === rid))
    .filter(Boolean)
    .slice(0, 4);

  // ── Structured data ──────────────────────────────────────────────────────
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
        item: `${BASE_URL}/category/${config.category.toLowerCase()}`,
      },
      { "@type": "ListItem", position: 3, name: config.name, item: url },
    ],
  };

  const faqSchema = content?.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }
    : null;

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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
              <Link
                href={`/category/${config.category.toLowerCase()}`}
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                {config.category}
              </Link>
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

        {/* Interactive engine */}
        <CalculatorEngine id={config.id} />

        {/* ── Content sections ────────────────────────────────────────────── */}
        {content && (
          <div className="mt-10 space-y-8 border-t border-gray-100 pt-8">

            {/* What is it */}
            {content.what && (
              <section aria-labelledby={`what-${config.id}`}>
                <h2
                  id={`what-${config.id}`}
                  className="text-base font-semibold text-gray-900 mb-2"
                >
                  What is {config.name}?
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">{content.what}</p>
              </section>
            )}

            {/* Formula */}
            {content.formula && (
              <section aria-labelledby={`formula-${config.id}`}>
                <h2
                  id={`formula-${config.id}`}
                  className="text-base font-semibold text-gray-900 mb-2"
                >
                  Formula
                </h2>
                <pre className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto">
                  {content.formula}
                </pre>
              </section>
            )}

            {/* Example */}
            {content.example && (
              <section aria-labelledby={`example-${config.id}`}>
                <h2
                  id={`example-${config.id}`}
                  className="text-base font-semibold text-gray-900 mb-2"
                >
                  Example
                </h2>
                <pre className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {content.example}
                </pre>
              </section>
            )}

            {/* Related calculators */}
            {related.length > 0 && (
              <section aria-labelledby={`related-${config.id}`}>
                <h2
                  id={`related-${config.id}`}
                  className="text-base font-semibold text-gray-900 mb-3"
                >
                  You May Also Need
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {related.map((c) => (
                    <Link
                      key={c.id}
                      href={`/calculator/${c.id}`}
                      className="group border border-gray-100 rounded-lg px-3 py-2.5 hover:border-gray-900 hover:bg-gray-50 transition-all"
                      aria-label={`${c.name} — ${c.description}`}
                    >
                      <p className="text-sm font-medium text-gray-900 group-hover:text-black leading-tight">
                        {c.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-tight line-clamp-1">
                        {c.category}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {content.faqs?.length > 0 && (
              <section aria-labelledby={`faq-${config.id}`}>
                <h2
                  id={`faq-${config.id}`}
                  className="text-base font-semibold text-gray-900 mb-4"
                >
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {content.faqs.map((faq, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">{faq.q}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </article>
    </>
  );
}
