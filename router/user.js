import { Router } from "express";
import { handleUserLogin, handleUserSignup } from "../controller/user.js";
const router = Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);

export { router as userRoute };
