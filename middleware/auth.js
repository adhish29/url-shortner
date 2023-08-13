import { getUser } from "../service/auth.js";

export async function restrictToLoggedInUserOnly(req, res, next) {
  const uid = req.cookies?.uid;
  if (!uid) return res.redirect("/login");
  const user = getUser(uid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

export async function isAuth(req, res, next) {
  const uid = req.cookies?.uid;
  // console.log(uid);
  const user = getUser(uid);
  req.user = user;
  next();
}
