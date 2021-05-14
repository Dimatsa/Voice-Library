import express, { Router } from "express";
import { client_path, client_index_path } from "../../config";

const router = Router();

// First try serving files statically from client
router.use(express.static(client_path));

// Fallback on main page and let React Router handle further routing
router.use((_, res) => res.sendFile(client_index_path));

export default router;
