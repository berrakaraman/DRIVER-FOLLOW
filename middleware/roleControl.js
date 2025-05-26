// middleware/roleControl.js
function roleControl(requiredRole) {
  return (req, res, next) => {
    console.log("User:", req.user);

    if (!req.user || req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Yetkisiz erişim: sadece " + requiredRole });
    }
    next();
  };
}

module.exports = {
  roleControl,
};
