import fs from 'fs';
import path from 'path';

let years = process.argv.slice(2).map((it) => {
  if (+it) {
    return +it
  } else {
    throw `Invalid year: "${it}"`
  }
})

for (const year of years) {
  for (let day = 1; day <= 25; day++) {
    let loaded = await loadDay(year, day);

    if (loaded) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

function loadDay(year, day) {
  let folder = new URL(`./inputs/${year}`, import.meta.url).pathname;
  let fileName = `day${String(day).padStart(2, '0')}.txt`;

  if (fs.existsSync(path.join(folder, fileName))) {
    console.log(`Day ${year}/${day} already loaded`);
    return null;
  }

  let url = `https://adventofcode.com/${year}/day/${day}/input`;
  let token = process.env.SESSION_TOKEN;

  if (!token) {
    console.error('SESSION_TOKEN env variable is not set');
    process.exit(1);
  }

  console.log(`Processing ${year}/${day}...`);
  console.log('Loading...', url);

  return fetch(url, {
    headers: {
      cookie: `session=${token}`
    }
  })
    .then((res) => {
      if (res.status === 404) {
        throw `Day ${year}/${day} not found. Too soon for ${day} december ${year}?`
      }

      return res.text();
    })
    .then((text) => {
      console.log('Loaded');

      text = text.trim();

      fs.mkdirSync(folder, { recursive: true });
      fs.writeFileSync(path.join(folder, fileName), text);
      console.log(`Saved ${year}/${day}`);
      return true;
    })
}
