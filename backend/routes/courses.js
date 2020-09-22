var express = require('express');
const {
  getCourses
} = require('../controllers/courses');
var router = express.Router({ mergeParams: true });


router.route('/').get(getCourses);



module.exports = router;
