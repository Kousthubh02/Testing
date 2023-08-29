const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../db'); // Assuming db.js exports a properly established connection

// GET route for rendering the form
router.get('/formSubmit', (req, res, next) => {
  res.send('Form is active');
});

// POST route for form submission
router.post('/formSubmit', [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid email'),
  check('designation').notEmpty().withMessage('Designation is required'),
  check('qualification').notEmpty().withMessage('Qualification is required'),
  check('date_of_joining').notEmpty().withMessage('Date of joining is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, designation, qualification, date_of_joining } = req.body;

  const inputData = {
    name,
    email,
    designation,
    qualification,
    date_of_joining
  };

  const selectQuery = 'SELECT * FROM personal_details WHERE email = ?';

  // // Check if the email already exists in the database
  // db.query(selectQuery, [email], (selectErr, selectResult) => {
  //   if (selectErr) {
  //     return res.status(500).json({ error: 'Database error' });
  //   }

  //   if (selectResult.length > 0) {
  //     return res.status(400).json({ error: 'Email already exists' });
  //   }

    // Insert the new record into the database
    const insertQuery = 'INSERT INTO personal_details SET ?';
    db.query(insertQuery, [inputData], (insertErr) => {
      if (insertErr) {
        return res.status(500).json({ error: 'Database error' });
      }
      return res.json({ message: 'You are successfully registered' });
    });
  });
// });

module.exports = router;
