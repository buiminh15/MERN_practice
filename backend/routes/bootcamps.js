var express = require('express');
const {
  getBootcamps,
  getBootcamp,
  updateBootcamps,
  createBootcamp,
  deleteBootcamp,
  getBootcampInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps');

// Include other resources routers
const courseRouter = require('./courses')

var router = express.Router();
// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius)

router.route('/').get(getBootcamps).post(createBootcamp);

router.route('/:id/photo').put(bootcampPhotoUpload)

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamp);

module.exports = router;
