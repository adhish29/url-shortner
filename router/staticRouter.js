import { Router } from "express";
import UrlModel from "../DAO/model/Url.model.js";
const router = Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const urls = await UrlModel.find({ createdBy: req.user._id }).toArray();
  const { email } = req.user;
  // console.log("email: ", email);
  res.render("home", { urls, email });
});

router.get("/signup", async (_, res) => {
  res.render("signup");
});

router.get("/login", (_, res) => {
  res.render("login");
});

export { router as staticRoute };
