const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const connection = require("../db");
const multer = require('multer');


// endpoint for profile image
router.get("/profile", (req, res) => {
  res.json({ message: "profile form active" });
});

const storage=multer.diskStorage({
  destination:function(req,file,cb){
    return cb(null,"./files")
  },
  filename:function(req,file,cb){
    return cb(null,`${Date.now()}-${file.originalname}`)
  }
});
const upload=multer({storage:storage})



router.post("/profile", upload.single('file'), (req, res) => {
  console.log(req.files);

  if (!req.files) {
    return res.status(400).json({ error: "No file uploaded" });
  }    
    res.json({ message: "File uploaded successfully"});
  });






module.exports = router;
