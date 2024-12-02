import fs from "fs";
import path from "path";

let day = new Date().getDate();
let year = new Date().getFullYear();
let DD = String(day).padStart(2, "0");

let url = `https://adventofcode.com/${year}/day/${day}/input`;
let token = process.env.SESSION_TOKEN;

if (!token) {
  console.error("SESSION_TOKEN env variable is not set");
  process.exit(1);
}

console.log("Loading...", url);

fetch(url, {
  headers: {
    cookie: `session=${token}`,
  },
})
  .then((res) => res.text())
  .then((text) => {
    console.log("Loaded");

    text = text.trim();

    let inputFolder = new URL(`./inputs/${year}`, import.meta.url).pathname;
    let answersFolder = new URL(`./${year}/answers`, import.meta.url).pathname;
    fs.mkdirSync(inputFolder, { recursive: true });
    fs.writeFileSync(path.join(inputFolder, `day${DD}.txt`), text);
    fs.writeFileSync(path.join(answersFolder, `day${DD}-part1.txt`), "");
    fs.writeFileSync(path.join(answersFolder, `day${DD}-part2.txt`), "");
    console.log("Saved!");

    createTodayJs(day);
    console.log(`day${DD}.js has been created, enjoy!`);
  })
  .catch((err) => {
    console.error(err);
  });

function createTodayJs(day) {
  let content = `import { runDay } from '../../utils.js';

// https://adventofcode.com/${year}/day/${day}

console.log(part1(\`test\`))

runDay(${year}, ${day})
  .part(1, part1)
  .part(2, part2)
  .end();

function part1(inp) {
  return 123;
}

function part2(inp) {
  return 123;
}
`;
  let folder = new URL(`./${year}/js/`, import.meta.url).pathname;
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, `day${DD}.js`), content);
}
