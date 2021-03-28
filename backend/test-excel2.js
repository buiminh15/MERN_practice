const XlsxPopulate = require('xlsx-populate');
const path = require('path')
const fs = require('fs')

const MAX_LINE_IN_SHEET = 6
const filePath = path.join(__dirname, 'templates', 'test.xlsx')
const fileCsvPath = path.join(__dirname, 'upload', 'test.csv')
const range = { s: { c: 3, r: 8 }, e: { c: 3, r: 13 } }
var dataArray
var arrayOfArrays = [];

try {
  const data = fs.readFileSync(fileCsvPath, 'utf8')
  // dataArray = data.split(/\r?\n/);
  dataArray = data.replace(/"$/gm, '",');
  // dataArray = dataArray.split(/", $/gm)
  dataArray = dataArray.split(/,$/gm)
  arrayOfArrays = splitArray(dataArray)
} catch (error) {
  console.error(error)
} 

const splitArray = (array) => {
  while (array.length > 0) {
    let arrayElement = array.splice(0, MAX_LINE_IN_SHEET);
    arrayOfArrays.push(arrayElement);
  }
  return arrayOfArrays;
}

async function run() {
  const workbook = await XlsxPopulate.fromFileAsync(filePath)
  for (let index = 0; index < arrayOfArrays.length; index++) {
    let sheet = workbook.sheet(index)
    workbook.cloneSheet(sheet, `M${index + 2}`)
    setValueToSheet(sheet, range, arrayOfArrays[index])
  }
  await workbook.toFileAsync("./out.xlsx")
  console.log('Done')
}

const setValueToSheet = (sheet, range, dataArray) => {
  let i = 1
  for (var R = range.s.r; R <= range.e.r; ++R) {
    for (var C = range.s.c; C <= range.e.c; ++C) {
      var cell_address = { c: C, r: R };
      const cell = sheet.row(cell_address.r).cell(cell_address.c);
      cell.value(dataArray[i - 1].replace(/^\r\n/gm,'')).style({ fontFamily: "Arial" })}
    i++
  }
}

run()






