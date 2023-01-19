// CHECK FOR NAME
const checkName = (req, res, next) => {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ error: "Name is required" });
  }
};

// CHECK FOR IS_FAV
const checkBoolean = (req, res, next) => {
  //?  To check if the value of req.body.is_favorite is a boolean value
 const favorite = req.body.is_favorite; 
  if (typeof favorite === 'boolean' || favorite === undefined)

   {
    next();
  } else {
    res.status(400).json({ error: "is_favorite must be a boolean value" });
  }
};
// CHECK FOR URL
const validateURL = (req, res, next) => {
  if (
    req.body.url.substring(0, 7) === "http://" ||
    req.body.url.substring(0, 8) === "https://" 
    // || req.body.url.substring(0, 11) === "https://www." 
  )
   {
    return next();
  } else {
    res
      .status(400)
      .json({ error: `You forgot to start your url with http:// or https://` });
  }
};

module.exports = { checkName, checkBoolean, validateURL };
