const router = require("express").Router();

const Tabs = require("./tabsModel");

router.get("/", (req, res) => {
  Tabs.getTabs()
    .then(tabs => {
      // const allTabs = tabs.map(tab => {
      //   return {
      //     id: tab.id,
      //     title: tab.title,
      //     website: tab.website,
      //     favison: tab.favicon
      //   };
      // });
      res.status(200).json(tabs);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: error
      });
    });
});

router.get("/:userId", (req, res) => {});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;