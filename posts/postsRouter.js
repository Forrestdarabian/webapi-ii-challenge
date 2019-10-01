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
      db.findById(id, res).then(([post]) => {
        res.status(201).json(post);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error getting post" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error inserting post" });
    });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id, res).then(post => {
    console.log(post);
    if (post.length) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post with this ID does not exist" });
    }
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title && !contents) {
    return res.status(400).json({ error: "Error, must add changes" });
  }
  db.update(id, { title, contents })
    .then(updated => {
      if (updated) {
        return res.status(400).json({ error: "Error, must add changes" });
      } else {
        res.status(404).json({ error: "Post with id does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error updating post" });
    });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Post with id does not exist" });
      }
    })
    .catch(err => {
      console.log("delete", err);
      res.status(500).json({ error: "Error deleting post" });
    });
});

module.exports = router;
