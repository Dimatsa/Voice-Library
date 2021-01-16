var express = require("express");
var router = express.Router();
const fs = require("fs");

router.get("/message", function (req, res) {
  res.json("Welcome To React (backend)");
});

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

module.exports = router;
