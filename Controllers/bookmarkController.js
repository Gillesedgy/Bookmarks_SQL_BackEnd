const express = require("express");
const bookmarks = express.Router();
const {getAllBookmarks} = require("../queries/bookmarks")

// INDEX 
bookmarks.get("/", async (req, res) => {
    // save the data for all bookmarks to a variable
    const allBookmarks = await getAllBookmarks();
    if(allBookmarks[0]){
          // send the actual res to the Frontend
    res.status(200).json(allBookmarks);
    } else{
        res.status(500).json({error:"Server Error"});
    }
  
  });

module.exports = bookmarks;