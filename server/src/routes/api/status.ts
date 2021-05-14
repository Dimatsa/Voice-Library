import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => res.json("Voice-Library backend is up!"));

export default router;
