const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const connection = require('../db'); 
const bcrypt = require('bcrypt');



router.post('/login', (req, res) => {
    const email = req.body.email;
    const plainPassword = req.body.password;

    const sqlSearch = 'SELECT * FROM login WHERE email = ?';
    const searchQuery = mysql.format(sqlSearch, [email]);

    connection.query(searchQuery, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Database error' });
        } else if (result.length === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            const storedPassword = result[0].password;

            if (plainPassword === storedPassword) {
                res.send({ message: 'Login Successful' });
            } else {
                res.send({ message: 'Bad Credentials' });
            }
        }
    });
});





module.exports = router;