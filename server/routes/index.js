var express = require("express");
var router = express.Router();
const multer = require("multer");

router.get("/message", function (req, res) {
  res.json("Welcome To React (backend)");
});

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
