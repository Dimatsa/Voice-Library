import path from "path";
import express from "express";
import fs from "fs";
import multer from "multer";
import createTranscript, { WordInfo } from "./speech";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath);

const PORT = process.env.PORT || 3001;

const app = express();
const router = express.Router();

router.get("/message", function (req, res) {
  res.json("Welcome To React (backend)");
});

// Testing
router.get("/split-voices", (req, res) => {
  splitVoices("./counting.wav", [
    { word: "hi", startSecs: 2, endSecs: 5 },
    { word: "there", startSecs: 7, endSecs: 9 },
  ]);

  res.send("Hello");
});

function splitVoices(allVoiceFile: string, wordInfo: WordInfo[]) {
  wordInfo.forEach((wordObj) => {
    ffmpeg.ffprobe(allVoiceFile, (_err, _metaData) => {
      const outputFile = `./carlafile/${wordObj.word}.wav`;
      const startingTime = wordObj.startSecs;
      const clipDuration = wordObj.endSecs - wordObj.startSecs;
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
  const filesToVoice = getSentence(req.query.words as string[]);
  console.log(filesToVoice);
  await convertList(filesToVoice, "./fileTest2.mp3");
  res.download("./fileTest2.mp3");
});

function getSentence(words: string[]) {
  const testFolder = "./carlafile/";
  const filesToVoice: string[] = [];
  const wordsPresent: string[] = [];

  const files = fs.readdirSync(testFolder);
  files.forEach((file) => {
    wordsPresent.push(file);
  });

  console.log(wordsPresent);
  words.forEach((word) => {
    const potentialFile = word + ".wav";
    if (wordsPresent.includes(potentialFile)) {
      filesToVoice.push(testFolder + potentialFile);
    }
  });
  console.log(filesToVoice);
  return filesToVoice;
}

async function convertList(wordLinks: string[], outputFile: string) {
  const convertedList: string[] = [];
  let currentNum = 0;
  await Promise.all(
    wordLinks.map(
      (word) =>
        new Promise<void>((success, fail) => {
          const newWord = word.slice(0, -3) + "mp3";
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

// eslint-disable-next-line no-unused-vars
function bridge(
  current: number,
  final: number,
  _convertList: string[],
  _outputFile: string
) {
  console.log("Inside Bridge");
  if (current == final) {
    console.log("COMBINING AUDIO");
  }
}

function combineAudio(wordLinks: string[], outputFile: string) {
  console.log(`convertedList: ${wordLinks}\noutputFile: ${outputFile}`);
  return new Promise<void>((success, fail) =>
    ffmpeg()
      .input("concat:" + wordLinks.join("|"))
      .outputOptions("-acodec copy")
      .save(outputFile)
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
    ["./carlafile/hi.wav", "./carlafile/there.wav"],
    "./fileTest1.mp3"
  );
  /*
  combineAudio(
    ["./carlafile/hi.wav", "./carlafile/there.wav"],
    "./fileTest1.mp3"
  );
  */

  res.send("hi");
});

const upload = multer({ storage: multer.memoryStorage() });

router.post("/uploadaudio", upload.single("audio"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send("Please upload a file");
    return;
  }

  console.log("Upload audio");

  const wordData = await createTranscript(file.buffer);
  if (!fs.existsSync("./carlafile")) {
    fs.mkdirSync("./carlafile");
  }
  fs.writeFileSync("tmpalldata.wav", file.buffer);
  console.log("wrote tmpalldata.wav");
  splitVoices("./tmpalldata.wav", wordData);

  res.send("sucess");
});

app.use("/api", router);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../../client/build")));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
