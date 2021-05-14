import VoiceTimestamper, { WordInfo } from "./ivoicetimestamper";
import splitWords from "./gcloudapi/speech";

export default class GCloudVoiceTimestamper implements VoiceTimestamper {
  async getTimestamps(audioBuffer: Buffer): Promise<WordInfo[]> {
    return await splitWords(audioBuffer);
  }
}
