import type { NextConfig } from "next";
import { readFileSync } from "fs";
import { join } from "path";

// Load and normalize redirects from CSV
function loadRedirectsFromCSV() {
  try {
    const csvPath = join(process.cwd(), "content/redirects.csv");
    const csvContent = readFileSync(csvPath, "utf-8");
    const lines = csvContent.split("\n").filter(line => line.trim());
    const redirects = [];

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const [from, to] = lines[i].split(",").map(s => s.trim());
      if (from && to) {
        // Normalize: lowercase, remove trailing slashes
        const normalizedFrom = from.toLowerCase().replace(/\/$/, "").replace(/\/index\.html$/, "");
        const normalizedTo = to.toLowerCase().replace(/\/$/, "").replace(/\/index\.html$/, "");

        if (normalizedFrom !== normalizedTo) {
          redirects.push({
            source: normalizedFrom,
            destination: normalizedTo,
            permanent: true,
          });
        }
      }
    }

    return redirects;
  } catch (error) {
    console.warn("No redirects.csv found or error reading it:", error);
    return [];
  }
}

const nextConfig: NextConfig = {
  async redirects() {
    const csvRedirects = loadRedirectsFromCSV();

    return [
      // CSV-based redirects
      ...csvRedirects,

      // Trailing slash cleanup (but not root)
      { source: '/:path+/', destination: '/:path+', permanent: true },

      // index.html cleanup
      { source: '/:path*/index.html', destination: '/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
