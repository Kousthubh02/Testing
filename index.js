const express = require('express')
const cors=require('cors');
const mysql = require('mysql');
const app=express();
const port=5000;
const connectMysql=require('./db');

app.use(express.json());
app.use(cors())
connectMysql();

app.use('/',require('./routes/formSubmit'))


app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})