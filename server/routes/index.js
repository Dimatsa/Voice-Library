var express = require("express");
var router = express.Router();
const fs = require("fs");
const multer = require("multer");

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

router.get("/message", function (req, res) {
  res.json("Welcome To React (backend)");
});

router.get("/split-voices", (req, res) => {
  var testVoice = "./server/counting.mp3";

  function splitAudio() {}

  ffmpeg.ffprobe(testVoice, (err, metaData) => {
    //const { duration } = metaData.format;
    //const { duration } = 2;
    const startingTime = 2;
    console.log(startingTime);
    const clipDuration = 5;
    ffmpeg()
      .input("./server/counting.mp3")
      .inputOptions([`-ss ${startingTime}`])
      .outputOptions([`-t ${clipDuration}`])
      .output("./endResult.mp3")
      .on("end", () => console.log("done"))
      .on("error", (err) => console.error(err))
      .run();
  });

  res.send("hi");
});

/* Must be sent files to be merged in order */
router.get("/combine-voices", (req, res) => {
  const testDir = "./server/ginafile/";
  var files = fs.readdirSync(testDir);
  var voicesToMix = [];
  //should be changed to however we are storing and displaying the stored voices
  var combinedVoice = fs.createWriteStream(testDir + "testFile.mp3");
  var readStream;
  //The next few lines of code should be replaced by a function that takes data
  //from data base and puts it in order of where it should be added
  files.forEach((file) => {
    voicesToMix.push(file.toString());
    console.log("File found!: " + file.toString());
  });

  function combineFiles() {
    if (voicesToMix.length == 0) {
      combinedVoice.end("Done");
      res.send(combinedVoice);
      return;
    }
    var currentFile = testDir + voicesToMix.pop();
    readStream = fs.createReadStream(currentFile);
    readStream.pipe(combinedVoice, { end: false });
    readStream.on("end", function () {
      console.log(currentFile + " has been added");
      combineFiles();
    });
  }
  combineFiles();
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
