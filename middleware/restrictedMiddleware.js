const jwt = require("jsonwebtoken");
const secrets = require("./secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
    if (err) {
      //token not valid or expired
      res.status(401).json({ message: "please Log in" });
    } else {
      //token valid
      req.decodedToken = decodedToken;
      next();
    }
  });
};
