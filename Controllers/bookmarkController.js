const express = require("express");
const bookmarks = express.Router();
const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
} = require("../queries/bookmarks");
const { checkName, checkBoolean } = require("../validations/checkBookmarks.js");

// INDEX
bookmarks.get("/", async (req, res) => {
  // save the data for all bookmarks to a variable
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks[0]) {
    // send the actual res to the Frontend
    res.status(200).json(allBookmarks);
  } else {
    res.status(500).json({ error: "Server Error" });
  }
});

//! DAY II
// ALLOW TO GET ONE -- SHOW using if/else
bookmarks.get("/:id", async (req, res) => {
  const { id } = req.params;
  const bookmark = await getBookmark(id);
  if (bookmark) {
    res.status(200).json(bookmark);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE ONE BOOKMARK -- POST using try/catch
bookmarks.post("/", checkBoolean, checkName, async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body);
    res.status(200).json(bookmark);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//

module.exports = bookmarks;
