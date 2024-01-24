const express = require('express');
const router = express.Router();
const connection = require('../db'); // Assuming db.js is in the same directory

router.put('/updateDetails/:id', async (req, res) => {
    const { name, designation, qualification, date_of_joining } = req.body;

    try {
        const newProfile = {};

        if (name) {
            newProfile.name = name;
        }
        if (designation) {
            newProfile.designation = designation;
        }
        if (qualification) {
            newProfile.qualification = qualification;
        }
        if (date_of_joining) {
            newProfile.date_of_joining = date_of_joining;
        }

        // Assuming you have a 'personal_details' table in your MySQL database
        const updateQuery = 'UPDATE personal_details SET name = ?, designation = ?, qualification = ?, date_of_joining = ? WHERE id = ?';


        // Assuming req.user.id is set up correctly before reaching this middleware
        const userId = req.params.id; // Assuming the user ID is in the route params

        connection.query(updateQuery, [newProfile, userId], (error, results) => {
            if (error) {
                console.error('Error updating profile:', error.message);
                return res.status(500).send('Internal Server Error');
            }

            // Check if any rows were affected by the update
            if (results.affectedRows === 0) {
                return res.status(404).send('User not found');
            }

            // Assuming the update is successful, you can send the updated profile as a response
            res.json(newProfile);
        });
    } catch (error) {
        console.error('Error in try-catch block:', error.message);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
