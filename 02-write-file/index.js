const path = require('path');
const fs = require('fs');
const { stdout, stdin } = require('process');

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath, 'utf-8');

stdout.write('Write the text:\n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit(stdout.write('Goodbye!\n'));
  } else {
    writeStream.write(data);
  }
});
process.on('SIGINT', () => {
  process.exit(stdout.write('Goodbye!\n'));
});
