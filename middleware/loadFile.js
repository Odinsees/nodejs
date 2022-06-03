const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, callBack) {
    callBack(null, 'images');
  },
  filename(req, file, callBack) {
    callBack(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, callBack) => {
  if (allowedTypes.includes(file.mimetype)) {
    callBack(null, true);
  } else {
    callBack(null, false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});
