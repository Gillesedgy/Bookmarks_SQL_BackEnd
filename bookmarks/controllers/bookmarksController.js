const express = require("express");
const bookmarks = express.Router();
const { validateURL } = require("../models/validations");
const bookmarksArray = require("../models/bookmark");
//middleware to validate URL
//* bookmarks is saved as express router.. bookmark is now an instance of express
// the different between this ("/") in here and ("/") and app.js
bookmarks.get("/", (req, res) => {
  res.json(bookmarksArray);
});
// only validates for that specific route --> Bookmarks enpoint for post
bookmarks.post("/", validateURL, (req, res) => {
  bookmarksArray.push(req.body);
  res.json(bookmarksArray.at(-1));
});
//SHOW ROUTE -- show one bookmarks based on index 
bookmarks.get("/:index", (req, res) => {
  const { index } = req.params;
  if (bookmarksArray[index]) {
    res.status(200).json(bookmarksArray[index]);
  } else {
    res.status(404).json({ error: `Not Found` });
  }
});
//Delete
bookmarks.delete("/:index", (req, res) => {
  const { index } = req.params;
  if (bookmarksArray[index]) {
    const deletedBookmarks = bookmarksArray.splice(index, 1);
    res.status(200).json(deletedBookmarks);
  } else {
    res.status(404).json({ error: `Not Found` });
  }
});
//PUT : Update 
bookmarks.put("/:index", (req, res)=>{
  const { index } = req.params;
  if(bookmarksArray[index]){
    bookmarksArray[index] = req.body
    res.status(200).json(bookmarksArray[index]);
  }else{
    res.status(404).json({ msg: "Not Found!"})
  }
})
module.exports = bookmarks;
