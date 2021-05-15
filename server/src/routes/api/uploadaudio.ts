import { Router } from "express";
import multer from "multer";
import { DefaultUser } from "../../models/user";
import audioService from "../../services/audiomanipulator";
import voiceService from "../../services/voicetimestamper";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("audio"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send("Please upload a file");
    return;
  }

  console.log("Upload audio");

  const wordData = await voiceService.getTimestamps(file.buffer);

  audioService.splitAudio(await DefaultUser, wordData, file.buffer);

  res.send("sucess");
});

export default router;
