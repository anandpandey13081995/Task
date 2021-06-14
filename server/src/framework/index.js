const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

if(process.env.BUILD !== 'production'){
    require('dotenv').config();
}

require('../core/repos/db').connect();

const app = express();

//middlewares
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', routes);

module.exports = app;