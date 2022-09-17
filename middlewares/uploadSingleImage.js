const multer = require("multer");

const uploadSingleImage = (fieldName) => {
  const storage = multer.memoryStorage();

  const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      // cb(new ApiError("Only Images allowed", 400), false);
      const error = new Error("Only Images allowed");
      error.statusCode = 400;
      cb(error, false);
    }
  };

  const upload = multer({ storage, fileFilter });
  return upload.single(fieldName);
};

module.exports = {
  uploadSingleImage,
};
