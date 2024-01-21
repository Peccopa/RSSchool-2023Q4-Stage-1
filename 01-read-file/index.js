const path = require('path');
const fs = require('fs');

const pathFile = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(pathFile, 'utf-8');
let result = '';

readStream.on('error', (err) => {
  console.log(err);
});

readStream.on('data', (chunk) => {
  result += chunk;
});

readStream.on('end', () => {
  console.log(result);
});
