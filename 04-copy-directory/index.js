const path = require('path');
const fs = require('fs');

const origPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

function copyDir(origPath, copyPath) {
  fs.mkdir(copyPath, { recursive: true }, () => {});
  fs.readdir(origPath, (err, files) => {
    files.forEach((file) => {
      fs.copyFile(`${origPath}/${file}`, `${copyPath}/${file}`, () => {});
    });
  });
}

copyDir(origPath, copyPath);
