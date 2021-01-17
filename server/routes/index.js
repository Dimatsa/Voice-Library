var express = require("express");
var router = express.Router();
const fs = require("fs");
const multer = require("multer");
const createTranscript = require("./speech");

const concat = require("audioconcat");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

router.get("/message", function (req, res) {
  res.json("Welcome To React (backend)");
});

router.get("/split-voices", (req, res) => {
  splitVoices("./server/counting.mp3", [{ word: "hi", start: 2, end: 5 }]);
  res.send("Hello");
});

function splitVoices(allVoiceFile, wordInfo) {
  //Hard coded for testing purposes (allVoiceFile and wordInfo are hard coded)
  allVoiceFile = "./server/counting.mp3";
  wordInfo = [
    { word: "bye", start: 2.5, end: 5.7 },
    { word: "hi", start: 1.2, end: 2.44 },
  ];

  wordInfo.forEach((wordObj) => {
    ffmpeg.ffprobe(allVoiceFile, (err, metaData) => {
      outputFile = `./server/carlafile/${wordObj.word}.wav`;
      var startingTime = wordObj.start;
      var clipDuration = wordObj.end - wordObj.start;
      console.log(`Start: ${startingTime}, Duration: ${clipDuration}`);
      ffmpeg()
        .input(allVoiceFile)
        .inputOptions([`-ss ${startingTime}`])
        .outputOptions([`-t ${clipDuration}`])
        .output(outputFile)
        .on("end", () => console.log("done"))
        .on("error", (err) => console.error(err))
        .run();
    });
  });
}

function combineAudio() {
  const testDir = "./server/ginafile/";
  var files = fs.readdirSync(testDir);
  var voicesToMix = [];
  var outputFile = "./server/ginafile/testResult.mp3";
  files.forEach((file) => {
    voicesToMix.push(testDir + file.toString());
    console.log("File found!: " + file.toString());
  });

  console.log(voicesToMix);
  voicesToMix = ["./server/ginafile/are.mp3", "./server/ginafile/doing.mp3"];
  concat(voicesToMix)
    .concat("./server/ginafile/anotherTestFile.mp3")
    .on("error", (error) => console.error("Failed to concatenate files", error))
    .on("end", () => console.info("Generating audio prompts"));

  /*
  ffmpeg("./server/ginafile/actualResult.wav")
    .on("error", (err) => console.log("error " + err))
    .on("end", () => console.log("Finished combining audio files"))
    .save("./server/ginafile/actualResult.wav");
    */
}

router.get("/combine-voices", (req, res) => {
  combineAudio();
  res.send("hi");
});

const upload = multer({ storage: multer.memoryStorage() });

router.post("/uploadaudio", upload.single("audio"), async (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;

    console.log(transcription);

    return next(error);
  }

  const transcription = await createTranscript(file.buffer);
  console.log(transcription);

  res.send(file);
});

module.exports = router;
