const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const connection = require('../db'); 


router.get('/details', (req, res, next) => {
  res.send('details form active');
});


// endpoint to upload personal details
router.post('/details', [
  check('name').notEmpty().withMessage('Name is required'),
  check('designation').notEmpty().withMessage('Designation is required'),
  check('qualification').notEmpty().withMessage('Qualification is required'),
  check('date_of_joining').notEmpty().withMessage('Date of joining is required'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, designation, qualification, date_of_joining} = req.body;

  const inputData = {
    name,
    designation,
    qualification,
    date_of_joining,
  };
    const insertQuery = 'INSERT INTO personal_details SET ?';
    connection.query(insertQuery, [inputData], (insertErr) => {
      if (insertErr) {
        return res.status(500).json({ error: 'Database error',message:insertErr});
      }
      return res.json({ message: 'You are successfully registered' });
    });
  });



  router.get('/profile',(req,res)=>{
    res.json({message:'profile form active'})
  })


  // endpoint for profile image
  router.post('/profile',(req,res)=>{

   const profileImg = req.files.profileImg;


    if (!req.files || !req.files.profileImg) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    connection.query('INSERT INTO profile SET profileimg = ?', [profileImg.name], (dbErr) => {
      if (dbErr) {
        console.error('Database error:', dbErr);
        return res.status(500).json({ error: 'Database error', message: dbErr });
      }

      res.json({ message: 'File uploaded and database updated' });
    });
  })



// endpoint for uploading cv

router.get('/cv',(req,res)=>{
  res.json({message:'cv form active'})
})

  router.post('/cv',(req,res)=>{

   const cv = req.files.cv;


    if (!req.files || !req.files.cv) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    connection.query('INSERT INTO cv SET cv = ?', [cv.name], (dbErr) => {
      if (dbErr) {
        console.error('Database error:', dbErr);
        return res.status(500).json({ error: 'Database error', message: dbErr });
      }

      res.json({ message: 'File uploaded and database updated' });
    });
  })

module.exports = router;
