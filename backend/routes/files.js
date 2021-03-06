const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs')
const { createEmptyFileOfSize, makeDir, cloneFileTemplateExcel, convertJsonToCsvTestCase, sendFileToClient, cloneFileCsv } = require('../helper/functions');
const Login = require('../models/Login.model');
const { MIME_TYPE } = require('../helper/constants');


router.post('/txt', function (req, res, next) {
  const { file_name, size } = req.body
  createEmptyFileOfSize(file_name, size);

  sendFileToClient(res, file_name, MIME_TYPE.TXT)
});

router.post('/excel', async function (req, res, next) {
  let dirDest = 'D:\\D5-TOOLS-TEST\\'
  let file_name = 'test.csv'
  const filePath = path.join(__dirname, '..', `upload`,file_name);
  makeDir(dirDest)
  // cloneFile('1.txt', path.join(dirDest, '1.txt'))
  try {
    await Login.find({}, (err, datas) => {
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else if (!datas) {
        res.json({ success: false, message: 'No datas found.' }); // Return error of no blogs found
      }
      convertJsonToCsvTestCase(datas)
      if (fs.existsSync(filePath)) {
        //file exists
        cloneFileCsv(file_name, path.join(dirDest, file_name))
      }
      res.json({ message: 'OK' })
    });
  } catch (error) {
    console.error(error)
  }
});


module.exports = router;
