import { readFileSync } from "fs";
import { join } from "path";

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

async function testRedirect(from, expectedTo) {
  try {
    const url = `${BASE_URL}${from}`;
    const response = await fetch(url, { redirect: "manual" });
    
    const status = response.status;
    const location = response.headers.get("location");
    
    // Check for 301 or 308 (permanent redirects)
    if (status !== 301 && status !== 308 && status !== 307) {
      return { from, expectedTo, status, location, success: false, error: `Expected 301/307/308, got ${status}` };
    }
    
    // Normalize location for comparison
    const normalizedLocation = location?.replace(BASE_URL, "").replace(/\/$/, "") || "";
    const normalizedExpected = expectedTo.replace(/\/$/, "");
    
    if (normalizedLocation !== normalizedExpected) {
      return { from, expectedTo, status, location: normalizedLocation, success: false, error: `Location mismatch` };
    }
    
    return { from, expectedTo, status, location: normalizedLocation, success: true };
  } catch (error) {
    return { from, expectedTo, success: false, error: error.message };
  }
}

async function runTests() {
  console.log(`🧪 Testing redirects against ${BASE_URL}\n`);
  
  // Load redirects from CSV
  const csvPath = join(process.cwd(), "content/redirects.csv");
  const csvContent = readFileSync(csvPath, "utf-8");
  const lines = csvContent.split("\n").filter(line => line.trim());
  
  const tests = [];
  for (let i = 1; i < lines.length; i++) {
    const [from, to] = lines[i].split(",").map(s => s.trim());
    if (from && to) {
      tests.push({ from, to });
    }
  }
  
  // Run tests
  const results = [];
  for (const { from, to } of tests) {
    const result = await testRedirect(from, to);
    results.push(result);
  }
  
  // Print results
  const failures = results.filter(r => !r.success);
  const successes = results.filter(r => r.success);
  
  console.log(`✅ Passed: ${successes.length}/${results.length}`);
  
  if (successes.length > 0) {
    successes.forEach(r => {
      console.log(`  ${r.from} → ${r.location} [${r.status}]`);
    });
  }
  
  if (failures.length > 0) {
    console.log(`\n❌ Failed: ${failures.length}/${results.length}`);
    failures.forEach(r => {
      console.log(`  ${r.from} → ${r.location || 'N/A'}`);
      console.log(`    Expected: ${r.expectedTo}`);
      console.log(`    Error: ${r.error}`);
    });
    process.exit(1);
  }
  
  console.log("\n✅ All redirect tests passed!");
}

runTests().catch(error => {
  console.error("Test runner error:", error);
  process.exit(1);
});
