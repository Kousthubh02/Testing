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

app.use('/',require('./routes/formSubmit'))
app.use('/auth',require('./routes/auth'))


app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
