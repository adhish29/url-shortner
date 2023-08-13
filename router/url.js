import { Router } from "express";
import { generateShortURL } from "../controller/url.js";
const router = Router();

router.post("/", generateShortURL);

export { router as URLRoute };
