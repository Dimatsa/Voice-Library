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

// Testing
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

router.get("/get-sentence", async (req, res) => {
  /* Change the thing below */
  console.log(req.query.words);
  filesToVoice = getSentence(req.query.words);
  console.log(filesToVoice);
  await convertList(filesToVoice, "./server/fileTest2.mp3");
  res.download("./server/fileTest2.mp3");
});

function getSentence(words) {
  const testFolder = "./server/carlafile/";
  var filesToVoice = [];
  var wordsPresent = [];

  files = fs.readdirSync(testFolder);
  files.forEach((file) => {
    wordsPresent.push(file);
  });

  console.log(wordsPresent);
  words.forEach((word) => {
    let potentialFile = word + ".wav";
    if (wordsPresent.includes(potentialFile)) {
      filesToVoice.push(testFolder + potentialFile);
    }
  });
  console.log(filesToVoice);
  return filesToVoice;
}

async function convertList(wordLinks, outputFile) {
  var convertedList = [];
  var expectedNum = wordLinks.length;
  var currentNum = 0;
  await Promise.all(
    wordLinks.map(
      (word) =>
        new Promise((success, fail) => {
          newWord = word.slice(0, -3) + "mp3";
          convertedList.push(newWord);
          console.log(convertedList);
          ffmpeg(word)
            .toFormat("mp3")
            .on("error", (err) => {
              console.log("An error occurred: " + err.message);
              fail(err);
            })
            .on("progress", (progress) => {
              console.log(
                "Processing: " + progress.targetSize + " KB converted"
              );
            })
            .on("end", () => {
              currentNum += 1;
              console.log("Processing finished ! " + currentNum.toString());
              // bridge(currentNum, expectedNum, convertedList, outputFile);
              success();
            })
            .save(newWord); //path where you want to save your file
        })
    )
  );

  console.log("COMBINING AUDIO");
  await combineAudio(convertedList, outputFile);
}

function bridge(current, final, convertList, outputFile) {
  console.log("Inside Bridge");
  if (current == final) {
    console.log("COMBINING AUDIO");
    c;
  }
}

function combineAudio(wordLinks, outputFile) {
  console.log(`convertedList: ${wordLinks}\noutputFile: ${outputFile}`);
  return new Promise((success, fail) =>
    audioconcat(wordLinks)
      .concat(outputFile)
      .on("start", (command) => {
        console.log("ffmpeg process started:", command);
      })
      .on("error", (error) => {
        console.error("Failed to concatenate files", error);
        fail(error);
      })
      .on("end", () => {
        console.info("Generating audio prompts");
        success();
      })
  );
}

// TESTER
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
  if (!fs.existsSync("./server/carlafile")) {
    fs.mkdirSync("./server/carlafile");
  }
  fs.writeFileSync("tmpalldata.wav", file.buffer);
  console.log("wrote tmpalldata.wav");
  splitVoices("./tmpalldata.wav", wordData);

  res.send("sucess");
});

module.exports = router;
