const mysql = require('mysql2');
const express = require('express');
const db = require('../db'); // Adjust the path accordingly

const authRouter = express.Router();

// Function to authenticate user and retrieve teacher ID
const loginUser = (email, password, callback) => {
  // Validate user credentials
  db.promise().query('SELECT teacher_id FROM login WHERE email = ? AND password = ?', [email, password])
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        const teacherId = rows[0].teacher_id;
        callback(null, { success: true, teacherId });
      } else {
        callback({ error: 'Invalid credentials' });
      }
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      callback({ error: 'Internal Server Error' });
    });
};

// POST endpoint for user login
authRouter.post('/auth', (req, res) => {
  const { email, password } = req.body;

  loginUser(email, password, (error, result) => {
    if (error) {
      res.status(401).json(error);
    } else {
      res.json(result);
    }
  });
});

module.exports = { loginUser, authRouter };
