const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload=multer({dest:'uploads/'})

// endpoint for profile image
router.get("/profile", (req, res) => {
  res.json({ message: "profile form active" });
});




router.post("/profile", upload.single('file'), (req, res) => {
  console.log(req.files);  
    res.json({ message: "File uploaded successfully"});
  });






module.exports = router;
