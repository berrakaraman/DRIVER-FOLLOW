// services/enterS.js
const { CRUD } = require("../models/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET = process.env.JWT_SECRET || "asdf";

const register = async (req, res) => {
  const { email, password, name, surname, role } = req.body;
  const exists = await new CRUD("driverfollow", "user").find({ email });
  if (exists.length)
    return res.status(400).json({ message: "Email zaten kayıtlı" });

  const hashed = await bcrypt.hash(password, 10);
  const user = {
    user_id: require("../models/database").id(),
    email,
    password: hashed,
    name,
    surname,
    role: role || "user",
  };
  await new CRUD("driverfollow", "user").insert(user);

  const payload = { user_id: user.user_id, role: user.role };
  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
  res
    .status(201)
    .json({ message: "Kayıt başarılı", user: payload, serviceToken: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await new CRUD("driverfollow", "user").findOne({ email });
  if (!user) return res.status(401).json({ message: "Kullanıcı bulunamadı" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Hatalı şifre" });

  const payload = { user_id: user.user_id, email: user.email, role: user.role };
  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
  res.json({ message: "Giriş başarılı", user: payload, serviceToken: token });
};
const me = (req, res) => {
  res.json({ user: req.user });
};

module.exports = { register, login, me };
