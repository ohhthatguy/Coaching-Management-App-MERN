const express = require('express');
const bodyParser = require('body-parser')
const connection = require('./database/database');
const router = require('./routes/route')
const app = express()
const cors = require('cors')


const dotenv = require('dotenv').config();


app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', router);



const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log("Running at ", PORT)
})


connection(process.env.DB_URL);