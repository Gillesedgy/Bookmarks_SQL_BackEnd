const express = require("express");
const cors = require("cors");

const bookmarksController = require("./controllers/bookmarksController.js");
const app = express();
const morgan = require("morgan");

//*Middleware
// this validates the url
app.use((req, res, next) => {
  console.log("This code runs for every request");
  next();
});
//  This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser.
app.use(express.json());
app.use(cors());
//place morgan
app.use(morgan("tiny"));

// Bookmarks Route --> grabs what bookmarkscontroller is to send it ot the browser... Found in bookmarksController.js to go for the routing
app.use("/bookmarks", bookmarksController);

app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});

// 404 PAGE
//* place last
app.get("*", (req, res) => {
  //send a json response
  res.status(404).json({ error: `Page not found!` });
});

module.exports = app;
