const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');
module.exports = {
  createEmptyFileOfSize: (fileName, size) => {
    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, '..', '/upload/', fileName);
      fh = fs.openSync(filePath, 'w');
      fs.writeSync(fh, 'ok', Math.max(0, size - 2));
      fs.closeSync(fh);
      resolve(true);
    });
  },

  makeDir: (filePath) => {
    // recursively create multiple directories
    fs.mkdir(filePath, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      console.log("Directory is created.");
    });
  },
  cloneFileTemplateExcel: (fileNameSrc, filePathDest) => {
    const filePath = path.join(__dirname, '..', 'templates', fileNameSrc);
    fs.copyFile(filePath, filePathDest, (err) => {
      if (err) throw err;
      console.log('source.txt was copied to destination.txt');
    });
  },
  convertJsonToCsvTestCase:async (datas) => {
    const fields = ['_id', 'test_case'];
    const opts = { fields };
    const filePath = path.join(__dirname, '..', `/upload/test.csv`);
    try {
      const parser = new Parser(opts);
      const csv = parser.parse(datas);
      await fs.writeFile(filePath, csv, function (err) {
        if (err) throw err;
        console.log('file saved');
      });
    } catch (err) {
      console.error(err);
    }
  },
  sendFileToClient: (res, file_name, mime_type) => {
    const filePath = path.join(__dirname, '..', `upload`,file_name);
    const src = fs.createReadStream(filePath);

    res.writeHead(200, {
      'Content-Type': `${mime_type}`,
      'Content-Disposition': `attachment; filename=${file_name}`,
      'Content-Transfer-Encoding': 'Binary'
    });
    src.pipe(res);
  },
  cloneFileCsv: async (fileNameSrc, filePathDest) => {
    const filePath = path.join(__dirname, '..', 'upload', fileNameSrc);
    await fs.copyFile(filePath, filePathDest, (err) => {
      if (err) throw err;
      console.log('source.txt was copied to destination.txt');
    });
  },
};