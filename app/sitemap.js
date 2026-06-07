import { calculators, categories } from "@/lib/calculators";

const BASE_URL = "https://calc-all-in-one.vercel.app/";

export default function sitemap() {
  const now = new Date().toISOString();

  const home = {
    url: `${BASE_URL}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  };

  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/category/${cat.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const calcPages = calculators.map((c) => ({
    url: `${BASE_URL}/calculator/${c.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [home, ...categoryPages, ...calcPages];
}
