const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const connection = require('../db'); 



// endpoint to upload personal details
router.get('/details', (req, res, next) => {
  res.send('details form active');
});

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



  // endpoint for profile image
  router.get('/profile',(req,res)=>{
    res.json({message:'profile form active'})
  })

// body : form-data

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

// body : form-data

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





// endpoint to submit area of specialization
  router.get('/areaSpl', (req, res, next) => {
    res.send('Form is active');
  });


// body :
//   { "data" : [
//     { "area": "AI","id":1 },
//     { "area": "CYBER SECURITY","id":1  },
//     { "area": "DATA SCIENCE" ,"id":1 },
//     { "area": "BLOCKCHAIN" ,"id":1 }
//  ]
//   }


  router.post('/areaSpl', (req, res, next) => {
    const data = req.body.data;
  
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty data provided' });
    }
  
    const values = data.map((record) => [record.area,record.id]);
  
    const query = 'INSERT INTO spl (area,teacher_id) VALUES ?';
  
    connection.query(query, [values], (dbErr) => {
      if (dbErr) {
        console.error('Database error:', dbErr);
        return res.status(500).json({ error: 'Database error', message: dbErr });
      }
  
      res.json({ message: 'Records inserted successfully' });
    });
  });


  // endpoint for subjects taught

  router.get('/subjects', (req, res, next) => {
    res.send('Form is active');
  });
  
  // Body:
//   { "data" : [
//     { "subject": "AI","semester":6,"id":1 },
//     { "subject": "CYBER SECURITY","semester":5,"id":1  },
//     { "subject": "DATA SCIENCE" ,"semester":8,"id":1 },
//     { "subject": "BLOCKCHAIN" ,"semester":5,"id":1 }
//  ]
//   }

  router.post('/subjects', (req, res, next) => {
    const data = req.body.data;
  
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty data provided' });
    }
  
    const values = data.map((record) => [record.subject,record.semster,record.id]);
  
    const query = 'INSERT INTO subject (subject,semester,teacher_id) VALUES ?';
  
    connection.query(query, [values], (dbErr) => {
      if (dbErr) {
        console.error('Database error:', dbErr);
        return res.status(500).json({ error: 'Database error', message: dbErr });
      }
  
      res.json({ message: 'Records inserted successfully' });
    });
  });

module.exports = router;
