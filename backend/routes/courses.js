var express = require('express');
const {
  getCourses, addCourse, getCourse
} = require('../controllers/courses');
var router = express.Router({ mergeParams: true });


router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourse);

module.exports = router;
