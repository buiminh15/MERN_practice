const fs = require('fs');

const createEmptyFileOfSize = (fileName, size) => {
  return new Promise((resolve, reject) => {
    fh = fs.openSync(fileName, 'w');
    fs.writeSync(fh, 'ok', Math.max(0, size - 2));
    fs.closeSync(fh);
    resolve(true);
  });
};

// Create a file of 1 GiB
createEmptyFileOfSize('./1.txt', 1024 * 1024 * 1024);