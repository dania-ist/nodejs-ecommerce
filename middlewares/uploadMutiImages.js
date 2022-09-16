const multer = require("multer");

const uploadMultiImages = (arrayOfFields) => {
  const storage = multer.memoryStorage();

  const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      const error = new Error("Only Images allowed");
      error.statusCode = 400;
      console.log(error);
      cb(error, false);
    }
  };

  const upload = multer({ storage, fileFilter });
  return upload.fields(arrayOfFields);
};

module.exports = {
  uploadMultiImages,
};
