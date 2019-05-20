const router = require("express").Router();
const bcrypt = require("bycryptjs");
// const secret = require('../../middleware/secrets')

const Auth = require("./authModel");
const generateToken = require("../../token/token");
// const jwt = require('jsonwebtoken')

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Auth.add(user)
    .then(saved => {
      res.status(201).json(saved);
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

module.exports = router;
