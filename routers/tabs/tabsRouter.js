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
  const tab = req.body;
  console.log(tab)
  if (tab.title) {
    try {
      const inserted = await Tabs.add(tab);
      res.status(201).json(inserted);
    } catch (error) {
      res.status(500).json(
        error
        // {  message : "we ran into an error posting your tab"}
      );
    }
  } else {
    res.status(400).json({ message: "Please provide a title and website" });
  }
});

router.put("/:id", restricted, (req, res) => {
  const id = req.params.id
  const changes = req.body
  Tabs
  .update(id, changes)
  .then(update => {
    res.status(200).json(update);
  })
  .catch(error => {
    res.status(500).json({
      errorMessage: error
    });
  });
});

// router.delete("/:id", restricted, async (req, res) => {
//   try {
//     await Tabs.remove(req.params.id);
//     if (count > 0) {
//       res
//         .status(204)
//         .json()
//         .end();
//     } else {
//       res.status(404).json({
//         message: "tab id does not exist, perhaps it was already deleted"
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "we ran into an error removing your tab" });
//   }
// });

router.delete("/:id", restricted, (req, res) => {
  Tabs.remove(req.params.id)
    .then(del => {
      res
        .status(200)
        .json({ message: "the tab has successfully been deleted" })
        .end(del);
    })
    .catch(err => {
      res.status(500).json("err");
    });
});

module.exports = router;
