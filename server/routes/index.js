var express = require("express");
var router = express.Router();
const multer = require("multer");

router.get("/message", function (req, res) {
  res.json("Welcome To React (backend)");
});

/*var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

router.post("/uploadaudio", upload.single("audio"), function (req, res, next) {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});
*/
const upload = multer({ storage: multer.memoryStorage() });

router.post("/uploadaudio", upload.single("audio"), function (req, res, next) {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

module.exports = router;
