var express = require("express");
var router = express.Router();
const fs = require("fs");
const multer = require("multer");
const createTranscript = require("./speech");

const audioconcat = require("audioconcat");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

router.get("/message", function (req, res) {
  res.json("Welcome To React (backend)");
});

router.get("/split-voices", (req, res) => {
  splitVoices("./server/counting.wav", [
    { word: "hi", startSecs: 2, endSecs: 5 },
    { word: "there", startSecs: 7, endSecs: 9 },
  ]);
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

router.get("/get-sentence", (req, res) => {
  /* Change the thing below */
  filesToVoice = getSentence([]);
  convertList(filesToVoice, "./server/fileTest2.mp3");
  res.send("getting sentence!");
});

function getSentence(words) {
  const testFolder = "./server/carlafile/";
  var filesToVoice = [];
  var wordsPresent = [];
  words = ["hi", "there"];

  files = fs.readdirSync(testFolder);
  files.forEach((file) => {
    wordsPresent.push(file);
  });
  words.forEach((word) => {
    let potentialFile = word + ".wav";
    if (wordsPresent.includes(potentialFile)) {
      filesToVoice.push(testFolder + potentialFile);
    }
  });
  return filesToVoice;
}

function convertList(wordLinks, outputFile) {
  var convertedList = [];
  var expectedNum = wordLinks.length;
  var currentNum = 0;
  wordLinks.forEach((word) => {
    newWord = word.slice(0, -3) + "mp3";
    convertedList.push(newWord);
    ffmpeg(word)
      .toFormat("mp3")
      .on("error", (err) => {
        console.log("An error occurred: " + err.message);
      })
      .on("progress", (progress) => {
        console.log("Processing: " + progress.targetSize + " KB converted");
      })
      .on("end", () => {
        currentNum += 1;
        fs.unlinkSync(word);
        console.log("Processing finished ! " + currentNum.toString());
        bridge(currentNum, expectedNum, convertedList, outputFile);
      })
      .save(newWord); //path where you want to save your file
  });
}

function bridge(current, final, convertList, outputFile) {
  console.log();
  if (current == final) {
    console.log("COMBINING AUDIO");
    combineAudio(convertList, outputFile);
  }
}

function combineAudio(wordLinks, outputFile) {
  console.log(`convertedList: ${wordLinks}\noutputFile: ${outputFile}`);
  audioconcat(wordLinks)
    .concat(outputFile)
    .on("start", (command) => {
      console.log("ffmpeg process started:", command);
    })
    .on("error", (error) => console.error("Failed to concatenate files", error))
    .on("end", () => console.info("Generating audio prompts"));
}

router.get("/combine-voices", (req, res) => {
  /* Change the thing below */
  console.log("COMBINE ENDPOINT");
  convertList(
    ["./server/carlafile/hi.wav", "./server/carlafile/there.wav"],
    "./server/fileTest1.mp3"
  );
  /*
  combineAudio(
    ["./server/carlafile/hi.wav", "./server/carlafile/there.wav"],
    "./server/fileTest1.mp3"
  );
  */

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
