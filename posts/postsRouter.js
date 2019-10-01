const express = require("express");
const db = require("../data/db");

const router = express.Router();
router.get("/", (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The posts info couldn't be retrieved" });
    });
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).json({ error: "Error with Title/Contents" });
  }
  db.insert({ title, contents })
    .then(({ id }) => {
      db.findById(id).then(([post]) => {
        res.status(201).json(post);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error inserting post" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error getting post" });
    });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id).then(post => {
    console.log(post);
    if (post.length) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post with this ID does not exist" });
    }
  });
});
module.exports = router;
