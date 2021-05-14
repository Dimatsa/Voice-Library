import Word from "./word";
import { promises as fs } from "fs";
import { save_folder } from "../config";

async function getSentence(words: string[]) {
  const testFolder = save_folder;
  const filesToVoice: Word[] = [];
  const wordsPresent: string[] = [];

  const files = await fs.readdir(testFolder);
  files.forEach((file) => {
    wordsPresent.push(file);
  });

  console.log(wordsPresent);
  words.forEach((word) => {
    const potentialFile = word + ".mp3";
    if (wordsPresent.includes(potentialFile)) {
      filesToVoice.push(new Word(word, testFolder + "/" + potentialFile));
    }
  });
  console.log(filesToVoice);
  return filesToVoice;
}

export default class User {
  constructor(public name: string) {}
  async findWordsByNames(words: string[]): Promise<Word[]> {
    return await getSentence(words);
  }
}
