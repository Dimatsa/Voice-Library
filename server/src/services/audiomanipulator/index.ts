import { UserModel, IUser } from "../../models/user";
import { WordModel, IWord } from "../../models/word";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import { WordInfo } from "../voicetimestamper/ivoicetimestamper";
ffmpeg.setFfmpegPath(ffmpegPath);
import fs, { PathLike } from "fs";
import { BadRequestError, InternalError } from "../../errors";
import tmp from "tmp";

class AudioManipulatorService {
  private tempFile = (postfix?: string): Promise<string> => {
    return new Promise((resolve: (path: string) => void, reject) =>
      tmp.tmpName({ postfix }, (err, name) =>
        err ? reject(err) : resolve(name)
      )
    );
  };

  private wordToTempFile = async (word: IWord): Promise<string> => {
    const filePath = await this.tempFile(".mp3");
    console.log("Writing to: " + filePath);
    await fs.promises.writeFile(filePath, word.data);
    return filePath;
  };

  public async combineWords(user: IUser, wordList: string[]) {
    const queryResult = await UserModel.findById(user._id)
      .populate({
        path: "words",
        match: { word: { $in: wordList } },
      })
      .exec();

    if (!queryResult) {
      throw new BadRequestError();
    }

    const words = queryResult.words;
    const outputFile = await this.tempFile(".mp3");
    console.log(`convertedList: ${words}\noutputFile: ${outputFile}`);
    const tempFiles = await Promise.all(words.map(this.wordToTempFile));
    await new Promise<void>((success, fail) =>
      ffmpeg()
        .input("concat:" + tempFiles.join("|"))
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

    await Promise.all(
      tempFiles.map(async (path) => await fs.promises.unlink(path))
    );

    const result = await fs.promises.readFile(outputFile);
    fs.promises.unlink(outputFile);

    return result;
  }

  private splitVoices = (allVoiceFile: string, wordInfo: WordInfo[]) => {
    return Promise.all(
      wordInfo.map(async (wordObj) => {
        const outputFile = await this.tempFile(".mp3");

        await new Promise<void>((success, fail) =>
          ffmpeg.ffprobe(allVoiceFile, (_err, _metaData) => {
            const startingTime = wordObj.startSecs;
            const clipDuration = wordObj.endSecs - wordObj.startSecs;
            console.log(`Start: ${startingTime}, Duration: ${clipDuration}`);
            ffmpeg()
              .input(allVoiceFile)
              .inputOptions([`-ss ${startingTime}`])
              .outputOptions([`-t ${clipDuration}`])
              .toFormat("mp3")
              .output(outputFile)
              .on("end", () => success())
              .on("error", (err) => fail(err))
              .run();
          })
        );

        return { word: wordObj.word, path: outputFile };
      })
    );
  };

  public async splitAudio(
    user: IUser,
    wordInfo: WordInfo[],
    audioBuffer: Buffer
  ) {
    const output_path = await this.tempFile(".wav");
    await fs.promises.writeFile(output_path, audioBuffer);
    console.log("wrote temp .wav");
    const files = await this.splitVoices(output_path, wordInfo);

    await Promise.all(
      files.map(async ({ word, path }: { word: string; path: PathLike }) => {
        const wordEntry = await UserModel.findById(user._id)
          .populate({
            path: "words",
            match: { word },
            select: "_id",
          })
          .exec();

        if (!wordEntry) {
          throw new InternalError();
        }

        const data = await fs.promises.readFile(path);

        if (wordEntry.words.length == 0) {
          const newWord = await WordModel.create({
            word,
            data,
          });
          await UserModel.findByIdAndUpdate(user._id, {
            $push: { words: newWord._id },
          });
        } else {
          await WordModel.findByIdAndUpdate(wordEntry.words[0]._id, { data });
        }

        await fs.promises.unlink(path);
      })
    );
    await fs.promises.unlink(output_path);
  }
}

export default new AudioManipulatorService();
