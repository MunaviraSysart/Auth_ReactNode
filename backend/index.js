const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const cors = require('cors');

//config env
dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECT, () =>{
    console.log('Db Connected')
})

//middlewares
app.use(express.json());
app.use(cors());

//initializing routes
app.use('/api/auth', authRoute)

//listening port
app.listen(process.env.PORT, () => {
    console.log('backend server is running on 5000....')
})