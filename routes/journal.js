const express = require("express");
const db = require("../db/db.js");

const router = express.Router();

router.get("/blog", async (req, res) => {
    try {
      const blogs = await db.select("*").from("journal");
      res.send(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });