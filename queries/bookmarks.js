// IMPORT DB
const db = require("../db/dbConfig.js");

//
const getAllBookmarks = async () => {
// Try Catch block --> ERROR HANDLING
  try {
    // 
    const allBookmarks = await db.any("SELECT * FROM bookmarks");
    return allBookmarks;
  } catch (error) {
    // RETURN AN ERROR IF THERE ARE ANY
    return error;
  }
 
};

module.exports = { getAllBookmarks };
