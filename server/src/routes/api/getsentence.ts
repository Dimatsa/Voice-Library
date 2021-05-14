import { Router } from "express";
import User from "../../models/user";
import audioService from "../../services/audiomanipulator";

const router = Router();

router.get("/", async (req, res) => {
  /* Change the thing below */
  console.log(req.query.words);
  const wordList: string[] = req.query.words as string[];

  res.download(await audioService.combineWords(new User("demo"), wordList));
});

export default router;
