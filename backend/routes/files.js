var express = require('express');
var router = express.Router();
const path = require('path');
const { createEmptyFileOfSize } = require('../helper/functions');

router.post('/', function(req, res, next) {
  console.log(req.body)
  const {file_name, size} = req.body.file
  createEmptyFileOfSize(file_name, 1024 * 1024 * size);
  const filePath = path.join(__dirname, '..', `/upload/${file_name}`);
  res.download(filePath); // Set disposition and send it.
});
// router.post('/', function(req, res, next) {

//   const filePath = path.join(__dirname, '..', `/upload/demo.json`);
//   res.download(filePath); // Set disposition and send it.
// });

module.exports = router;
