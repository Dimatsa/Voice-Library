export default class Word {
  constructor(word: string, protected path: string) {}

  asTempFile() {
    return this.path;
  }
}
