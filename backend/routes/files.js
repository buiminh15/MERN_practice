import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const { createEmptyFileOfSize, makeDir, cloneFileTemplateExcel, convertJsonToCsvTestCase, sendFileToClient, cloneFileCsv } = require('../helper/functions');
const Testcase = require('../models/Testcase.model');
const { MIME_TYPE, DESTINATION_PATH } = require('../helper/constants');


router.post('/txt', function (req, res, next) {
  const { file_name, size } = req.body
  createEmptyFileOfSize(file_name, size);

  sendFileToClient(res, file_name, MIME_TYPE.TXT)
});

router.post('/excel', async function (req, res, next) {
  const { file_name } = req.body
  const filePath = path.join(__dirname, '..', `upload`, file_name);
  if (!fs.existsSync(DESTINATION_PATH)) {
    makeDir(DESTINATION_PATH)
  }
  try {
    await Testcase.find({}, (err, datas) => {
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else if (!datas) {
        res.json({ success: false, message: 'No datas found.' }); // Return error of no blogs found
      }
      convertJsonToCsvTestCase(datas, file_name)
      if (fs.existsSync(filePath)) {
        //file exists
        cloneFileCsv(file_name, path.join(DESTINATION_PATH, file_name))
      }
      res.json({ success: true })
    });
  } catch (error) {
    console.error(error)
  }
});

export default router;
