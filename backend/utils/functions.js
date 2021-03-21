import fs from 'fs'
import path from 'path'
import { Parser } from 'json2csv'

export const createEmptyFileOfSize = (fileName, size) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '..', '/upload/', fileName);
    fh = fs.openSync(filePath, 'w');
    fs.writeSync(fh, 'ok', Math.max(0, size - 2));
    fs.closeSync(fh);
    resolve(true);
  });
}

export const makeDir = (filePath) => {
  // recursively create multiple directories
  fs.mkdir(filePath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log("Directory is created.");
  });
}
export const cloneFileTemplateExcel = (fileNameSrc, filePathDest) => {
  const filePath = path.join(__dirname, '..', 'templates', fileNameSrc);
  fs.copyFile(filePath, filePathDest, (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });
}
export const convertJsonToCsvTestCase = async (datas, file_name) => {
  const fields = ['test_case'];
  const opts = { fields };
  const filePath = path.join(__dirname, '..', `upload`, file_name);
  try {
    const parser = new Parser(opts);
    let csv = parser.parse(datas);
    let strArr = csv.split('\n')
    strArr.shift()
    let arr = strArr.map(item => item = item.match(/.{1,65}(\s|$)/g)).map(item => item.join('\r\n')).join('\n')
    await fs.writeFileSync(filePath, arr, function (err) {
      if (err) throw err;
      console.log('file saved');
    });
  } catch (err) {
    console.error(err);
  }
}
export const sendFileToClient = (res, file_name, mime_type) => {
  const filePath = path.join(__dirname, '..', `upload`, file_name);
  const src = fs.createReadStream(filePath);

  res.writeHead(200, {
    'Content-Type': `${mime_type}`,
    'Content-Disposition': `attachment; filename=${file_name}`,
    'Content-Transfer-Encoding': 'Binary'
  });
  src.pipe(res);
}
export const cloneFileCsv = async (fileNameSrc, filePathDest) => {
  const filePath = path.join(__dirname, '..', 'upload', fileNameSrc);
  await fs.copyFile(filePath, filePathDest, (err) => {
    if (err) throw err;
    console.log('copied to destination.txt');
  });
}




