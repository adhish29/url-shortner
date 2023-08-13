import express from "express";
import dotenv from "dotenv";
import path from "path";
import moment from "moment";
import ip from "ip";
import cookieParser from "cookie-parser";

import connect from "./config/db.js";
import { URLRoute } from "./router/url.js";
import { find, upsert } from "./DAO/impl/UrlDAOImpl.js";
import { staticRoute } from "./router/staticRouter.js";
import { userRoute } from "./router/user.js";
import { isAuth, restrictToLoggedInUserOnly } from "./middleware/auth.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

dotenv.config();

connect();

app.use("/user", userRoute);
app.use("/url", restrictToLoggedInUserOnly, URLRoute);
app.use("/", isAuth, staticRoute);

export async function redirectToURL(req, res) {
  try {
    let data = await find({ shortURL: req.params.shortURL });
    data = {
      ...data,
      visitHistory: [
        ...data.visitHistory,
        {
          clientAddress: ip.address(),
          timestamp: moment(Date.now()).format("yyyy-MM-DD hh:mm:ss zz"),
        },
      ],
    };

    upsert(data);

    res.redirect(data.redirectedURL);
    // return status
    //   ? res.status(200).json({ msg: `redirected to ${data.redirectedURL}` })
    //   : null;
  } catch (error) {
    console.log("Error at redirectToURL ", error);
    return res.status(400).json({ error: error.message });
  }
}

app.get("/url/:shortURL", redirectToURL);

app.listen(3000, () => console.log("Listening to PORT 3000"));
