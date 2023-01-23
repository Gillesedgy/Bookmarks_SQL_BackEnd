// CHECK FOR NAME
const checkReviewer = (req, res, next) => {
    if (req.body.reviewer) {
      next();
    } else {
      res.status(400).json({ error: "Name is required" });
    }
  };




  
  module.exports = {checkReviewer}