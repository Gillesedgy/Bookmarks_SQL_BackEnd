const db = require("../db/dbConfig");

// GET ALL -- INDEX
//!
const getAllReviews = async (bookmark_id) => {
  try {
    const allReviews = await db.any(
      "SELECT * FROM reviews WHERE bookmark_id=$1",
      bookmark_id
    );
    return allReviews;
  } catch (error) {
    return error;
  }
};

// Get one Review -- SHOW
const getReview = async (id) => {
  try {
    const oneReview = await db.one("SELECT * FROM reviews WHERE id=$1", id);
    return oneReview;
  } catch (error) {
    return error;
  }
};

// CREATE -- POST
const createReview = async (review) => {
  try {
    const newReview = await db.one(
      "INSERT INTO reviews (reviewer, title, content, rating, bookmark_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [
        review.reviewer,
        review.title,
        review.content,
        review.rating,
        review.bookmark_id,
      ]
    );
    return newReview;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteReview = async (id) => {
  try {
    const deletedReview = await db.one(
      "DELETE FROM reviews WHERE id=$1 RETURNING *",
      id
    );
    return deletedReview;
  } catch (error) {
    return error;
  }
};

// UPDATE -- PUT
const updateReview = async (id, review) => {
  try {
    const updatedReview = await db.one(
      "UPDATE reviews SET reviewer= $1, title=$2, content=$3, rating=$4 WHERE id=$5 RETURNING *",
      [review.reviewer, review.title, review.content, review.rating, id]
    );
    return updatedReview;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
};
