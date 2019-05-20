const secret = require("../middleware/secrets");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ["user"]
  };

  const options = {
    expiresIn: "24h"
  };
  return jwt.sign(payload, secret.jwtSecret, option);
}

module.exports = generateToken;
