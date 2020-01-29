const express = require('express')
const app = express()
const path = require("path")
const chalk = require('chalk');
const config = require('./app/config.js');

// console.log(chalk.blue('Hello world!'));
// const config = require(".app/config.js");
const mongoose = require('mongoose')
        mongoose.connect(
            config.mongodbConnectionString, 
            {useNewUrlParser: true, useUnifiedTopology: true }
        )
 
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('views',  path.join(__dirname, 'templates'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public'))); 


require("./app/routes.js")(app)

app.listen(8000)
// app.listen(config.port,()=>{ console.log('http//:127.0.0.1: ${config.port}')})
