const speech = require("@google-cloud/speech").v1p1beta1;

const createTranscript = async (audioBuffer) => {
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
  let words = [];
  response.results[0].alternatives[0].words.forEach((wordData) => {
    const startSecs =
      parseFloat(wordData.startTime.seconds) +
      parseFloat(wordData.startTime.nanos / 1000000000);
    const endSecs =
      parseFloat(wordData.endTime.seconds) +
      parseFloat(wordData.endTime.nanos / 1000000000);
    const word = wordData.word;

    const relevantWordData = {
      word,
      startSecs,
      endSecs,
    };

    words.push(relevantWordData);
  });

  return words;
};

module.exports = createTranscript;
