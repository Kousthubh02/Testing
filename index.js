const express = require('express')
const cors=require('cors');
const mysql = require('mysql');
const app=express();
const port=5000;
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(express.json());
app.use(cors())

app.use('/',require('./routes/formSubmit'))


app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})

