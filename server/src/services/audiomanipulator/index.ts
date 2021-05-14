import User from "../../models/user";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import { WordInfo } from "../voicetimestamper/ivoicetimestamper";
ffmpeg.setFfmpegPath(ffmpegPath);
import fs from "fs";

class AudioManipulatorService {
  public async combineWords(user: User, wordList: string[]) {
    const words = await user.findWordsByNames(wordList);
    const outputFile = "./fileTest2.mp3";
    console.log(`convertedList: ${words}\noutputFile: ${outputFile}`);
    await new Promise<void>((success, fail) =>
      ffmpeg()
        .input("concat:" + words.map((word) => word.asTempFile()).join("|"))
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
    return outputFile;
  }

  private splitVoices(allVoiceFile: string, wordInfo: WordInfo[]) {
    wordInfo.forEach((wordObj) => {
      ffmpeg.ffprobe(allVoiceFile, (_err, _metaData) => {
        const outputFile = `./carlafile/${wordObj.word}.mp3`;
        const startingTime = wordObj.startSecs;
        const clipDuration = wordObj.endSecs - wordObj.startSecs;
        console.log(`Start: ${startingTime}, Duration: ${clipDuration}`);
        ffmpeg()
          .toFormat("mp3")
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

  public async splitAudio(
    user: User,
    wordInfo: WordInfo[],
    audioBuffer: Buffer
  ) {
    if (!fs.existsSync("./carlafile")) {
      await fs.promises.mkdir("./carlafile");
    }
    await fs.promises.writeFile("tmpalldata.wav", audioBuffer);
    console.log("wrote tmpalldata.wav");
    this.splitVoices("./tmpalldata.wav", wordInfo);
  }
}

export default new AudioManipulatorService();
