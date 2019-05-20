const router = require("express").Router();

const Tabs = require("./tabsModel");
const restricted = require("../../middleware/restrictedMiddleware");

router.get("/", restricted, (req, res) => {
  Tabs.getTabs()
    .then(tabs => {
      res.status(200).json(tabs);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: error
      });
    });
});

router.get("/:userId", restricted, (req, res) => {});

router.post("/", restricted, async (req, res) => {
const newTab = req.body;
if (newTab.user_id) {
  try {
    const inserted = await Tabs.add(newTab);
    res.status(201).json(inserted)
  } catch (error) {
    res.status(500).json(error,
      // {  message : "we ran into an error posting your tab"}
      )
  }
} else {
  res.status(400).json({ message: "Please provide a title and website"})
}

});






router.put("/:id", restricted, (req, res) => {});

router.delete("/:id", restricted, (req, res) => {

});

module.exports = router;