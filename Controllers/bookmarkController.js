const express = require("express");
const bookmarks = express.Router();

const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
} = require("../queries/bookmarks");
// IMPRTING VALIDATIONS
const { checkName, checkBoolean, validateURL} = require("../validations/checkBookmarks.js");

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
  if (!bookmark.message) {
    res.status(200).json(bookmark);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// CREATE ONE BOOKMARK -- POST using try/catch
bookmarks.post("/", checkBoolean, checkName,validateURL, async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body);
    res.status(200).json(bookmark);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//! DAY III -- UPDATE AND DELETE
// DELETE
bookmarks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBookmark = await deleteBookmark(id);
  if (deletedBookmark.id) {
    res.status(200).json(deletedBookmark);
  } else {
    res.status(404).json("Bookmark ID not found");
  }
  //? TRY CATCH ERROR ALTERNATIVE
  // try {
  //   const {id} = req.params
  //   const deletedBookmark = await deleteBookmark(id);
  //   return res.status(200).json(deletedBookmark);
  // } catch (error) {
  //   return error
  // }
});

// UPDATE

bookmarks.put('/:id', checkName, checkBoolean, validateURL, async (req,res)=>{
try {
  const {id} = req.params
  const updatedBookmark = await updateBookmark(id, req.body)
  res.status(200).json(updatedBookmark) 
} catch (error) {
  return res.status(404).json(" Bookmark ID not found");
}
})

module.exports = bookmarks;
