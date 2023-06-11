import fs from 'fs';

// https://adventofcode.com/2022/day/7

let folder = '../inputs/d07/';
let input = fs.readFileSync(folder + 'input.txt').toString();

let folders = {};
let currentPath = "";

input.split("\n").map((line) => {
  if (line.startsWith("$ cd ")) {
    let dirName = line.slice(5);
    if (dirName === "..") {
      currentPath = cutLastFolder(currentPath);
    } else {
      if (dirName === "/") {
        currentPath = "/";
      } else {
        currentPath = currentPath + dirName + "/";
      }
    }
    folders[currentPath] = folders[currentPath] || 0;
    return;
  }
  let fileSize = parseInt(line);

  if (fileSize) {
    let dir = currentPath;
    while (dir) {
      folders[dir] += fileSize;
      dir = cutLastFolder(dir);
    }
  }
});

let part1Result = Object.values(folders)
  .filter((size) => {
    return size <= 100_000;
  })
  .reduce((sum, curr) => sum + curr, 0);

console.log({ part1Result });

let freeSpace = 70_000_000 - folders["/"];
let needToDelete = 30_000_000 - freeSpace;

Object.values(folders).forEach((folderSize) => {
  if (folderSize > needToDelete) {
    console.log(folderSize - needToDelete, folderSize);
  }
});

function cutLastFolder(path) {
  if (path === "/") return null;
  let arr = path.split("/");
  arr.pop();
  arr.pop();
  let res = arr.join("/");
  if (res && res[res.length - 1] !== "/") {
    res += "/";
  }
  return res || "/";
}
