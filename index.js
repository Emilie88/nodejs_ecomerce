const express = require('express')
const app = express()
const path = require("path")
const chalk = require('chalk');
const config = require('./app/config.js');
const crypto =    require('crypto');


// console.log(chalk.blue('Hello world!'));
// const config = require(".app/config.js");
const mongoose = require('mongoose')
        mongoose.connect(
            config.mongodbConnectionString, 
            {useNewUrlParser: true, useUnifiedTopology: true }
        )
 
app.set('views',  path.join(__dirname, 'templates'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public'))); 
app.get('/', function(req, res) {
    res.render('index')
})
app.get('/inscription', function(req, res) {
    res.render('user_register.pug')
})
const bodyParser = require('body-parser')

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json());

    var userSchema = mongoose.Schema({
        cicvilite: String,
        nom: {type: String}, 
        prenom: {type: String},
        email: {type: String},  
        password: {type: String}
    }); 
     
    var User = mongoose.model('User', userSchema);

    app.post('/inscription',function(req,res){
        // Nous utilisons le schéma User
          var user = new User();
        // Nous récupérons les données reçues pour les ajouter à l'objet User
          user.civilite =  req.body.civilite;
          user.nom = req.body.nom;
          user.prenom =  req.body.prenom;
          user.mail = req.body.email;
          user.password = crypto.createHash('sha1')
          .update( req.body.mdp)
          .digest('hex');
         
        //Nous stockons l'objet en base
          user.save(function(err){
            if(err){
              res.send(err);
            }
            res.send({message : 'Bravo...'});
          })
    })
     
    // app.post('/inscription', function(req, res) {
    //     let civilite = req.body.civilite;
    //     let name = req.body.nom;
    //     let prenom = req.body.prenom;
    //     let email = req.body.email;
        
    //      res.send(civilite + ' ' + name +' '+ prenom)
    //      console.log(chalk.red(civilite + ' ' + name +' '+ prenom +' ' +email));
        
    // })

    
    
 
app.listen(8000)
// app.listen(config.port,()=>{ console.log('http//:127.0.0.1: ${config.port}')})
