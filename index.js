const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); 
const fileUpload = require('express-fileupload');
const app = express();
const port = 8000;
app.use(fileUpload());
app.use(express.json());
app.use(cors());

// Replace your database connection configuration
const pool = require('./db'); 

app.get('/',async (_req,res) => {
console.log("you are conneted to this port");
});


app.get('/personal_details', async (_req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM personal_details');
    res.json({ data: rows });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.use('/',require('./routes/formSubmit'));


app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
