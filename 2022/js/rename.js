import fs from 'fs';
import path from 'path';

const sourceDir = '.'; // Replace with the path to your source directory

// Get the list of folders in the source directory
fs.readdir(sourceDir, (err, folders) => {
  if (err) {
    console.error(err);
    return;
  }

  // Iterate through each folder
  folders.forEach(folder => {
    const folderPath = path.join(sourceDir, folder);

    // Check if the item is a directory
    fs.stat(folderPath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isDirectory()) {
        const filePath = path.join(folderPath, 'task.js');
        const parentFolderName = folder.replace('day-', 'day');

        // Rename the file and move it to the source directory
        fs.rename(filePath, path.join(sourceDir, `${parentFolderName}.js`), err => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(`Moved and renamed ${folder}/task.js to ${parentFolderName}.js`);
        });
      }
    });
  });
});
