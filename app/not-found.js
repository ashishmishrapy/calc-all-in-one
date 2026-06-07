import Link from "next/link";

export const metadata = { title: "Not Found" };

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <p className="text-4xl font-bold text-gray-900 mb-2">404</p>
      <p className="text-gray-400 text-sm mb-6">Page not found.</p>
      <Link href="/" className="text-sm text-gray-900 underline underline-offset-2">
        Back to all calculators
      </Link>
    </div>
  );
}
