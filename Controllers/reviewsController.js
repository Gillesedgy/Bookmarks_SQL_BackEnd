const express = require("express");

//! pass an option to express.Router() to merge parameters from the bookmarks and reviews route
const reviews = express.Router({ mergeParams: true });

const {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} = require("../queries/reviews");

// INDEX
reviews.get("/", async (req, res) => {
  const { bookmarkId } = req.params;
  try {
    const allReviews = await getAllReviews(bookmarkId);
    res.status(200).json(allReviews);
  } catch (error) {
    res.json(error);
  }
  //? ONLY TO GET REVIEWS W?O THERE BOOKMARKS
  // const allReviews = await getAllReviews();
  // if (allReviews[0]) {
  //   res.status(200).json(allReviews);
  // } else {
  //   res.status(500).json({ error: "Server Not Found" });
  // }
});

// Get ONE --> SHOW
reviews.get("/:id", async (req, res) => {
  const { id } = req.params;
  const review = await getReview(id);
  if (!review.message) {
    res.status(200).json(review);
  } else {
    res.status(400).json({ error: " Not Found" });
  }
});

// CREATE ONE REVIEW
reviews.post("/", async (req, res) => {
  try {
    const review = await createReview(req.body);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// DELETE
reviews.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await deleteReview(id);
    return res.status(200).json(deletedReview);
  } catch (error) {
    return error;
  }
});

// UPDATE
reviews.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await updateReview(id, req.body);
    res.status(200).json(updatedReview);
  } catch (error) {
    return res.status(404).json("Review ID not found");
  }
});

module.exports = reviews;
