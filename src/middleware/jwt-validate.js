const jwt = require("jsonwebtoken");

const TOKEN_SECRET = "SpeakFriendAndEnter";

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = {
  verifyToken,
  TOKEN_SECRET,
};
