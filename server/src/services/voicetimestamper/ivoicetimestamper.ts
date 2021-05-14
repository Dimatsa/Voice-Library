export type WordInfo = {
  word: string;
  startSecs: number;
  endSecs: number;
};

export default interface VoiceTimestamperService {
  getTimestamps(audioBuffer: Buffer): Promise<WordInfo[]>;
}
