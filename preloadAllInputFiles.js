import fs from 'fs';
import path from 'path';

let years = process.argv.slice(2).map((it) => {
  if (+it) {
    return +it
  } else {
    throw new Error(`Invalid year: "${it}"`)
  }
})

// If no years specified, default to all years from 2015 to current year
if (years.length === 0) {
  const currentYear = new Date().getFullYear();
  years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);
  console.log(`No years specified, downloading for all years: ${years.join(', ')}\n`);
}

let stats = { downloaded: 0, skipped: 0, errors: 0 };

for (const year of years) {
  console.log(`\n=== Processing year ${year} ===`);
  for (let day = 1; day <= 25; day++) {
    let result = await loadDay(year, day);

    if (result === 'downloaded') {
      stats.downloaded++;
      console.log(`⏳ Waiting 2 seconds before next request...\n`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else if (result === 'skipped') {
      stats.skipped++;
    } else if (result === 'error') {
      stats.errors++;
    }
  }
}

console.log('\n=== Summary ===');
console.log(`Downloaded: ${stats.downloaded}`);
console.log(`Skipped (already exists): ${stats.skipped}`);
console.log(`Errors: ${stats.errors}`);
console.log('Done!');

async function loadDay(year, day) {
  let folder = new URL(`./inputs/${year}`, import.meta.url).pathname;
  let fileName = `day${String(day).padStart(2, '0')}.txt`;

  if (fs.existsSync(path.join(folder, fileName))) {
    console.log(`✓ Day ${year}/${day} already exists (skipped)`);
    return 'skipped';
  }

  let url = `https://adventofcode.com/${year}/day/${day}/input`;
  let token = process.env.SESSION_TOKEN;

  if (!token) {
    console.error('❌ SESSION_TOKEN env variable is not set');
    process.exit(1);
  }

  console.log(`⬇️  Downloading ${year}/day${String(day).padStart(2, '0')}...`);

  try {
    const res = await fetch(url, {
      headers: {
        cookie: `session=${token}`
      }
    });

    if (res.status === 404) {
      console.log(`⚠️  Day ${year}/${day} not found (probably not released yet)`);
      return 'error';
    }

    if (!res.ok) {
      console.log(`❌ Error ${res.status}: ${res.statusText}`);
      return 'error';
    }

    let text = await res.text();
    text = text.trim();

    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, fileName), text);
    console.log(`✅ Saved ${year}/day${String(day).padStart(2, '0')}`);
    return 'downloaded';
  } catch (error) {
    console.log(`❌ Error downloading ${year}/${day}: ${error.message}`);
    return 'error';
  }
}
