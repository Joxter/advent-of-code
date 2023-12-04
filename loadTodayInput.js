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
    console.log('Loaded');

    text = text.trim();

    let folder = new URL(`./${year}/inputs/d${String(day).padStart(2, '0')}/`, import.meta.url).pathname;
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'input.txt'), text);
    console.log('Saved!');

    createTodayJs(day);
    console.log(`day${String(day).padStart(2, '0')}.js has been created, enjoy!`);
  })
  .catch((err) => {
    console.error(err);
  });

function createTodayJs(day) {
  let content = `import { runDay } from '../../utils.js';

// https://adventofcode.com/2023/day/${day}

console.log(part1(\`test\`))

runDay(2023, ${day})
  .part(1, part1)
  .part(2, part2);

function part1(inp) {
  return 123;
}

function part2(inp) {
  return 123;
}`
  ;

  let folder = new URL(`./${year}/js/`, import.meta.url).pathname;
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, `day${String(day).padStart(2, '0')}.js`), content);
}