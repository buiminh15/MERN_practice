import XLSX from 'xlsx'
import path from 'path'
const filePath = path.join(__dirname, 'templates', 'test.xlsx')
var workbook = XLSX.readFile(filePath);
var first_sheet_name = workbook.SheetNames[0];
var address_of_cell = 'A1';
var worksheet = workbook.Sheets[first_sheet_name];
var desired_cell = worksheet[address_of_cell];

/* Get the value */
var desired_value = (desired_cell ? desired_cell.v : undefined);

console.log(desired_value)

// worksheet['D4'].v = 'NEW VALUE from NODE';
XLSX.utils.sheet_add_aoa(worksheet, [['NEW VALUE from NODE11']], { origin: 'D4' });
console.log(worksheet['D4'].v)
XLSX.writeFile(workbook, filePath);