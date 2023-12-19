const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 'uploads' is the folder name
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

router.get("/profile", (req, res) => {
  res.json({ message: "profile form active" });
});

router.post('/profile', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully.');
});
// test form view for uploading image so postman isn't needed
router.get("/test", (req, res) => {
  res.render("index");
});

module.exports = router;
