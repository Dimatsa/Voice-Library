const speech = require("@google-cloud/speech").v1p1beta1;

const createTranscript = async (audioBuffer) => {
  const client = new speech.SpeechClient();

  const languageCode = "en-US";

  const config = {
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
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  return transcription;
};

module.exports = createTranscript;
