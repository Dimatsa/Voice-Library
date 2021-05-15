import { Router } from "express";
import { DefaultUser } from "../../models/user";
import audioService from "../../services/audiomanipulator";
import stream from "stream";

const router = Router();

router.get("/", async (req, res) => {
  /* Change the thing below */
  console.log(req.query.words);
  const wordList: string[] = req.query.words as string[];

  res.setHeader("Content-disposition", "attachment; filename=result.mp3");
  res.setHeader("Content-type", "audio/mpeg");

  const filestream = new stream.PassThrough();
  filestream.end(await audioService.combineWords(await DefaultUser, wordList));

  filestream.pipe(res);
});

export default router;
