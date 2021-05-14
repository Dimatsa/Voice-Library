import { v1p1beta1 as speech } from "@google-cloud/speech";
import { WordInfo } from "../ivoicetimestamper";

export default async (audioBuffer: Buffer): Promise<WordInfo[]> => {
  const client = new speech.SpeechClient();

  const languageCode = "en-US";

  const config = {
    enableWordTimeOffsets: true,
    languageCode: languageCode,
    useEnhanced: true,
  };

  const audio = {
    content: audioBuffer.toString("base64"),
  };

  const request = {
    config: config,
    audio: audio,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  // Collect only valid word data
  let words: WordInfo[] = [];

  const speechAlternatives = (
    response.results as NonNullable<typeof response.results>
  )[0].alternatives;
  const speechWords = (
    speechAlternatives as NonNullable<typeof speechAlternatives>
  )[0].words;
  (speechWords as NonNullable<typeof speechWords>).forEach((wordData) => {
    const startTime = wordData.startTime as NonNullable<
      typeof wordData.startTime
    >;
    const endTime = wordData.endTime as NonNullable<typeof wordData.endTime>;
    const startSecs =
      parseFloat(startTime.seconds as any) +
      parseFloat(startTime.nanos as any) / 1000000000;
    const endSecs =
      parseFloat(endTime.seconds as any) +
      parseFloat(endTime.nanos as any) / 1000000000;
    const word = wordData.word as string;

    const relevantWordData: WordInfo = {
      word,
      startSecs,
      endSecs,
    };

    words.push(relevantWordData);
  });

  return words;
};
