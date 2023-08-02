const express = require("express");
const db = require("../db/db.js");

const router = express.Router();

//Get all journals
router.get("/journals", async (req, res) => {
  try {
    const journal = await db.select("*").from("journal");
    res.send(journal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get journal using id
router.get("/journal/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blogs = await db("journal").where({ id });
    if (blogs.length !== 0) {
      res.send(blogs);
    } else {
      res.status(404).json({ error: "Journal not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Add a new entry to your journals
router.post("/journal/new", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const journal = await db("journal").insert({ title, content, author });
    res.status(201).send(journal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update existing journal using id
router.put("/journal/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    const blog = await db("journal")
      .where({ id })
      .update({ title, content, author }, ["id", "title", "content", "author"]);
    if (blog.length !== 0) {
      res.status(201).send(blog);
    } else {
      res.status(404).json({ error: "Journal not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete journal entry using journal id
router.delete("/journal/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await db("journal").where({ id }).del();
    if (blog) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
