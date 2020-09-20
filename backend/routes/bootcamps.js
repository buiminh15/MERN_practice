var express = require('express');
var router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  updateBootcamps,
  createBootcamp,
  deleteBootcamp,
} = require('../controllers/bootcamps');
const { route } = require('./users');

router.route('/').get(getBootcamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamp);

module.exports = router;
