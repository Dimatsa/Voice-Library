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
  splitVoices("./server/counting.wav", [{ word: "hi", start: 2, end: 5 }]);
  res.send("Hello");
});

function splitVoices(allVoiceFile, wordInfo) {
  wordInfo.forEach((wordObj) => {
    ffmpeg.ffprobe(allVoiceFile, (err, metaData) => {
      outputFile = `./server/carlafile/${wordObj.word}.wav`;
      var startingTime = wordObj.startSecs;
      var clipDuration = wordObj.endSecs - wordObj.startSecs;
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

function combineAudio(wordList, outputFile) {
  concat(wordList)
    .concat(outputFile)
    .on("error", (error) => console.error("Failed to concatenate files", error))
    .on("end", () => console.info("Generating audio prompts"));
}

router.get("/combine-voices", (req, res) => {
  /* Change the thing below */
  combineAudio(
    ["./server/ginafile/are.mp3", "./server/ginafile/you.mp3"],
    "./server/ginafile/testResult.mp3"
  );
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

  const wordData = await createTranscript(file.buffer);
  fs.writeFile("tmpalldata.wav", file.buffer, () => {});
  splitVoices("./tmpalldata.wav", wordData);
  combineAudio(
    [
      "./server/carlafile/3.wav",
      "./server/carlafile/1.wav",
      "./server/carlafile/5.wav",
    ],
    "./result.wav"
  );
  res.send(wordData);
});

module.exports = router;
