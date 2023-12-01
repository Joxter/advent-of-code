import fs from 'fs';
import path from 'path';

let day = (new Date()).getDate();
let year = (new Date()).getFullYear();

let url = `https://adventofcode.com/${year}/day/${day}/input`;
let token = process.env.SESSION_TOKEN;

if (!token) {
  console.error('SESSION_TOKEN env variable is not set');
  process.exit(1);
}

console.log('Loading...', url);

fetch(url, {
  headers: {
    cookie: `session=${token}`
  }
})
  .then((res) => res.text())
  .then((text) => {
    text = text.trim();

    console.log('Loaded');

    let folder = new URL(`./${year}/inputs/d${String(day).padStart(2, '0')}/`, import.meta.url).pathname;
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'input.txt'), text);

    console.log('Saved, enjoy!');
  })
  .catch((err) => {
    console.error(err);
  });

