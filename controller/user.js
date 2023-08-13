import { find, upsert } from "../DAO/impl/UserDaoImpl.js";
import { v4 as uuidv4 } from "uuid";
import { getUser, setUser } from "../service/auth.js";

export async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(404).json({ msg: "Please provide all the details!!!" });

  const newUser = {
    _id: uuidv4(),
    name,
    email,
    password,
  };

  await upsert(newUser);
  return res.redirect("/");
}

export async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(404).json({ msg: "Please provide all the details!!!" });

  const user = await find({ email, password });
  if (!user)
    return res.render("login", {
      error: "Please provide correct credentials",
    });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  return res.redirect("/");
}
