const express = require('express')
const app = express()
const path = require("path")
const bodyParser = require('body-parser')
const chalk = require("chalk")
// chargement du fichier de config
const config = require("./app/config.js")
const session = require('express-session')
const flash = require('express-flash');
 require('./app/passport')(app);
 require('./app/passport-github')(app);



/**
 * Connexion à MongoDB
 */
const mongoose = require('mongoose')

mongoose.connect(
    config.mongodbConnectionString, 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
)
mongoose.connection.once('open', () =>  {
    console.log(
        chalk.yellow(`Connexion au serveur MongoDB : ${chalk.green(`OK`)}`)
    )
})

app.use(session({
    secret: 'my-key', resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}))
app.use(flash());

app.use((req,res,next) => {res.locals.session = req.session; next();});
app.use(function(req, res, next){
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});


/**
 * Mise en place du midlleware bodyParser 
 * pour traiter les requetes http
 */
app.use(bodyParser.urlencoded({extended: false}))

/**
 * Mise en place du répertoire static (./public)
 */
app.use(express.static(path.join(__dirname, 'public')))

/**
 * Mise en place du moteur de templating (PUG)
 */
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'pug')

// const passport = require('./passport')(app);

/**
 * Les routes
 */
 require("./app/routes.js")(app)


/**
 * Mise en écoute sur le port http
 */
app.listen(config.port, () => {
    console.log(
        chalk.red(`Le serveur est en écoute à l'adresse : ${chalk.blue(`http://127.0.0.1:${config.port}`)}`)
    )
})