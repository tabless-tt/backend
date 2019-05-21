const router = require("express").Router();
const bcrypt = require("bcryptjs");
const secret = require('../../middleware/secrets')

const Auth = require("./authModel");
// const generateToken = require("../../token/token");
const jwt = require('jsonwebtoken')


router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Auth.add(user)
    .then(saved => {
      const token = generateToken(user);
      res.status(201).json({saved, token});
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Auth.findBy({ username })
    .first()
    .then(user => {
      const token = generateToken(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          message: `welcome ${user.username}!`,
          user,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentails" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
