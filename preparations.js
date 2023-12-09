import fs from 'fs';
import path from 'path';

generate();

function generate () {
  for (let day = 1; day <= 25; day++) {
    let DD = String(day).padStart(2, '0');

    let oldFolder = new URL(`./2023/inputs/d${DD}`, import.meta.url).pathname;
    let p1 = fs.readFileSync(path.join(oldFolder, 'part1.txt'));
    let p2 = fs.readFileSync(path.join(oldFolder, 'part2.txt'));

    let newFolder = new URL(`./2023/answers/`, import.meta.url).pathname;
    fs.mkdirSync(newFolder, { recursive: true });
    fs.writeFileSync(path.join(newFolder, `day${DD}-part1.txt`), p1);
    fs.writeFileSync(path.join(newFolder, `day${DD}-part2.txt`), p2);
  }
}