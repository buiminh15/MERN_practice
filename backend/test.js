// const generator = require('test-file-generator/lib/classes/TestFileGenerator');
// console.time('start')
// let genFile = new generator.TestFileGenerator('txt');
// genFile.setSize(2000)
// genFile.generateFile()
// console.timeEnd('start');
// console.log(new generator.TestFileGenerator('gif').generateFile());

const translate = require('translate-google');

translate('I speak Chinese', { to: 'zh-cn' })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });