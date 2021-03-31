import fs from 'fs'
import path from 'path'
import { Parser } from 'json2csv'

const createEmptyFileOfSize = (fileName, size) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '..', '/upload/', fileName);
    fh = fs.openSync(filePath, 'w');
    fs.writeSync(fh, 'ok', Math.max(0, size - 2));
    fs.closeSync(fh);
    resolve(true);
  });
}

const makeDir = (filePath) => {
  // recursively create multiple directories
  fs.mkdir(filePath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log("Directory is created.");
  });
}
const cloneFileTemplateExcel = (fileNameSrc, filePathDest) => {
  const filePath = path.join(__dirname, '..', 'templates', fileNameSrc);
  fs.copyFile(filePath, filePathDest, (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });
}
const convertJsonToCsvTestCase = async (datas, file_name, fieldsArr) => {
  const fields = fieldsArr;
  const opts = { fields };
  const filePath = path.join(__dirname, '..', 'upload', file_name);
  try {
    const parser = new Parser(opts);
    let csv = parser.parse(datas);
    let strArr = csv.split('\n')
    strArr.shift()
    let arr = strArr.map(item => item = item.match(/.{1,65}(\s|$)/g)).map(item => item.join('\r\n')).join('\n')
    fs.writeFileSync(filePath, arr, function (err) {
      if (err) throw err;
      console.log('file saved');
    });
  } catch (err) {
    console.error(err);
  }
}
const sendFileToClient = (res, file_name, mime_type) => {
  const filePath = path.join(__dirname, '..', `upload`, file_name);
  const src = fs.createReadStream(filePath);

  res.writeHead(200, {
    'Content-Type': `${mime_type}`,
    'Content-Disposition': `attachment; filename=${file_name}`,
    'Content-Transfer-Encoding': 'Binary'
  });
  src.pipe(res);
}
const cloneFileCsv = async (fileNameSrc, filePathDest) => {
  const filePath = path.join(__dirname, '..', 'upload', fileNameSrc);
  await fs.copyFile(filePath, filePathDest, (err) => {
    if (err) throw err;
    console.log('copied to destination.txt');
  });
}

const splitArray = (array, MAX_LINE_IN_SHEET) => {
  let arrayOfArrays = []
  while (array.length > 0) {
    let arrayElement = array.splice(0, MAX_LINE_IN_SHEET);
    arrayOfArrays.push(arrayElement);
  }
  return arrayOfArrays;
}

const setValueToSheet = (sheet, range, dataArray) => {
  let i = 1
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let cell_address = { c: C, r: R };
      const cell = sheet.row(cell_address.r).cell(cell_address.c);
      cell.value(dataArray[i - 1].replace(/^(\r\n|\n|\r)/gm, '')).style({ fontFamily: "Arial" })
    }
    let cellChk = sheet.row(R).cell(15 + i)
    cellChk.value('〇').style({ fontFamily: "Arial" })
    i++
  }
}

const setResultToSheet = (sheet, range) => {
  let i = 1
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let cell_address = { c: C, r: R };
      const cell = sheet.row(cell_address.r).cell(cell_address.c);
      cell.value('result').style({ fontFamily: "Arial" })
    }
    let cellChk = sheet.row(R).cell(15 + i)
    cellChk.value('〇').style({ fontFamily: "Arial" })
    i++
  }
}

export {
  cloneFileCsv,
  sendFileToClient,
  createEmptyFileOfSize,
  convertJsonToCsvTestCase,
  cloneFileTemplateExcel,
  makeDir, splitArray, setValueToSheet, setResultToSheet
}




