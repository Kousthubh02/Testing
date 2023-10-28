const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 8000;
const fileUpload = require('express-fileupload');
const db = require('./db'); // Adjust the path accordingly

app.use(fileUpload());
app.use(express.json());
app.use(cors());

app.use('/', require('./routes/formSubmit'));

app.get('/personal_details', async (_req, res) => {
  try {
    const [rows, fields] = await db.promise().query('SELECT * FROM personal_details');
    res.json({ data: rows });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
