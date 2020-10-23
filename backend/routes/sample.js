var express = require('express');
const multer = require('multer');
var router = express.Router();
var { getTest, uploadFileToFolder } = require('../controllers/sampleController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads');
  },
  filename: (req, file, callback) => {
      let math = ["image/png", "image/jpeg"];
      if (math.indexOf(file.mimetype) === -1) {
        let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
        return callback(errorMess, null);
      }
      // T?n c?a file th? m?nh n?i th?m m?t c?i nh?n th?i gian ?? ??m b?o kh?ng b? tr?ng.
      let filename = `${Date.now()}-minhbb-${file.originalname}`;
      callback(null, filename);
  }
});

const upload = multer({ storage: storage });
/* GET home page. */
router.route('/test').get(getTest)

router.route('/upload', upload.single('image')).post(uploadFileToFolder)
module.exports = router;
