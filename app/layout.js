import "./globals.css";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { CalculatorProvider } from "@/context/CalculatorContext";
import { calculators } from "@/lib/calculators";

const BASE_URL = "https://calc.tools";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Calc — Free Online Calculators",
    template: "%s | Calc",
  },
  description:
    "Free online calculators for finance, health, math, unit conversion, and everyday use. Fast, minimal, no ads.",
  keywords: [
    "calculator", "EMI calculator", "SIP calculator", "BMI calculator",
    "GST calculator", "FD calculator", "PPF calculator", "percentage calculator",
    "age calculator", "free online calculator", "India calculator",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Calc",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Calc — Free Online Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@calc_tools",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CalculatorProvider>
          <div className="min-h-screen bg-white flex flex-col">
            {/* Skip link */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-gray-900 focus:text-white focus:rounded-lg focus:text-sm"
            >
              Skip to main content
            </a>

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
              <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
                <Link
                  href="/"
                  className="text-base font-bold text-gray-900 tracking-tight shrink-0 hover:text-gray-600 transition-colors"
                  aria-label="Calc — Home"
                >
                  Calc
                </Link>
                <nav aria-label="Site search" className="flex-1">
                  <SearchBar />
                </nav>
              </div>
            </header>

            {/* Page content */}
            <main id="main-content" className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
              {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-100 py-6" aria-label="Site footer">
              <div className="max-w-3xl mx-auto px-4 space-y-3">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {["Finance", "Health", "Math", "Converter", "Education", "Everyday"].map((cat) => (
                    <Link
                      key={cat}
                      href={`/category/${cat.toLowerCase()}`}
                      className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      {cat} Calculators
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <p className="text-xs text-gray-400">{calculators.length} free calculators · Fast · No ads</p>
                  <nav aria-label="Footer navigation">
                    <ul className="flex items-center gap-4 list-none p-0 m-0">
                      <li>
                        <Link href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link href="/sitemap.xml" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                          Sitemap
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </footer>
          </div>
        </CalculatorProvider>
      </body>
    </html>
  );
}
