import fs from 'fs';
import path from 'path';

// generate files in current folder:
//   for 1 to 25 make empty files like
//     inputs/d01/input.txt
//     inputs/d01/part1.txt
//     inputs/d01/part2.txt
//
//     inputs/d02/input.txt
//     inputs/d02/part1.txt
//     inputs/d02/part2.txt
//     ...
//     inputs/d25/input.txt
//     inputs/d25/part1.txt
//     inputs/d25/part2.txt

generate();

function generate () {
  for (let day = 1; day <= 25; day++) {
    let folder = new URL(`./inputs/d${String(day).padStart(2, '0')}/`, import.meta.url).pathname;

    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'input.txt'), '');
    fs.writeFileSync(path.join(folder, 'part1.txt'), '');
    fs.writeFileSync(path.join(folder, 'part2.txt'), '');
  }
}