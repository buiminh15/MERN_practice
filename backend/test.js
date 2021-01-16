const generator = require('test-file-generator/lib/classes/TestFileGenerator');
console.time('start')
let genFile = new generator.TestFileGenerator('txt');
genFile.setSize(2000)
genFile.generateFile()
console.timeEnd('start');
// console.log(new generator.TestFileGenerator('gif').generateFile());

