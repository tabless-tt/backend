const router = require("express").Router();

const Users = require("./usersModel");
const restricted = require("../../middleware/restrictedMiddleware");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json({ users, token: req.decodedToken });
    })
    .catch((err = res.send(err)));
});

