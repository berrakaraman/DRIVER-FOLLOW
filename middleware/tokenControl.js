// middleware/tokenControl.js
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "asdf";

function tokenControl(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Token bulunamadı." });

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token formatı hatalı." });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ message: "Geçersiz veya süresi dolmuş token." });
    req.user = decoded;
    next();
  });
}
module.exports = { tokenControl };
