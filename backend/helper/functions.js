const fs = require('fs');
const path = require('path');

const createEmptyFileOfSize = (fileName, size) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '..', '/upload/', fileName);
    console.log('filePath ', filePath)
    fh = fs.openSync(filePath, 'w');
    fs.writeSync(fh, 'ok', Math.max(0, size - 2));
    fs.closeSync(fh);
    resolve(true);
  });
};

exports.createEmptyFileOfSize = createEmptyFileOfSize;

