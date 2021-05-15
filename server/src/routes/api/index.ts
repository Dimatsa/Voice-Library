import { NextFunction, Router } from "express";
import status from "./status";
import getsentence from "./getsentence";
import uploadaudio from "./uploadaudio";
import { NotFoundError } from "../../errors";

const router = Router();

router.use("/status", status);
// router.use("/get-sentence", getsentence);
// router.use("/uploadaudio", uploadaudio);

// API should produce a "not found" so it isn't handled by the client
router.use((_req, _res, next: NextFunction) => next(new NotFoundError()));

export default router;
