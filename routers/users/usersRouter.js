const router = require("express").Router();

const Users = require("./usersModel");
const Tabs = require("../tabs/tabsModel");
const restricted = require("../../middleware/restrictedMiddleware");

//get all users and decoded token of logged in user
router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json({ users, token: req.decodedToken });
    })
    .catch(err => res.send(err));
});

//get users tabs
router.get("/:id/", restricted, (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      Tabs.getTabs()
        .where({ user_id: req.params.id })
        .then(tabs => {
          user.tabs = tabs;
          return res.status(200).json(user);
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we ran into an error retreving the user" });
    });
});

module.exports = router;
