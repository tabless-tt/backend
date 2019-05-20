const router = require("express").Router();

const Users = require("./usersModel");
const Tabs = require("../tabs/tabsModel");
const restricted = require("../../middleware/restrictedMiddleware");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json({ users, token: req.decodedToken });
    })
    .catch(err => res.send(err));
});

router.get("/:id/", (req, res) => {
  Users.findById(req.params.id)
    .then(users => {
      Tabs.find()
        .where({ user_id: req.params.id })
        .then(tabs => {
          users.tabs = tabs;
          return res.status(200).json(users);
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we ran into an error retreving the user" });
    });
});

module.exports = router;
