import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import { upsert } from "../DAO/impl/UrlDAOImpl.js";

export async function generateShortURL(req, res) {
  try {
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: "Please provide URL!!!" });

    const urlObj = {
      _id: uuidv4(),
      shortURL: nanoid(8),
      redirectedURL: url,
      visitHistory: [],
      createdBy: req.user._id,
    };
    // console.log(res.locals);
    const status = await upsert(urlObj);
    const { email } = req.user;
    // return status ? res.status(301).json({ id: urlObj.shortURL }) : null;
    return res.render("home", { id: urlObj.shortURL, email });
  } catch (error) {
    console.log("Error at generateShortURL ", error);
    return res.status(400).json({ error: error.message });
  }
}
