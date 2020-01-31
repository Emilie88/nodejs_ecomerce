const passport = require('passport')
module.exports = (app) => {

    
    app.get('/', (req, res) => {
        req.flash("success", "your flash messages are working");
        let Controller = require("../controllers/Home.js")
        let Home = new Controller()
        Home.print(req, res)
       
    })
    
    app.get('/inscription', (req, res) => {
        let Controller = require("../controllers/Register.js")
        let Register = new Controller()
        Register.printForm(req, res)
    })
    
    app.post('/inscription', (req, res) => {
        let Controller = require("../controllers/Register.js")
        let Register = new Controller()
        Register.process(req, res)
    })


        
    app.get('/connexion', (req, res) => {
        let Controller = require("../controllers/SignIn.js")
        let SignIn = new Controller()
        SignIn.printForm(req, res)
        
    })
    
    app.post('/connexion', (req, res) => {
        let Controller = require("../controllers/SignIn.js")
        let SignIn = new Controller()
        SignIn.process(req, res)
    })
     // la connexion google avec Passport
     app.get('/connexion/google', 
     passport.authenticate('google', { scope: ['profile'] })
    )
    // la page de callback
    app.get('/connexion/google/callback', 
        passport.authenticate('google', { 
            successRedirect: '/', 
            failureRedirect: '/connexion' 
        })
    );
        // la connexion google avec Passport
        app.get('/connexion/github', 
        passport.authenticate('github', { scope: ['profile'] })
        )
        // la page de callback
        app.get('/connexion/github/callback', 
        passport.authenticate('github', { 
            successRedirect: '/', 
            failureRedirect: '/connexion' 
        })
    );


    app.get('/connexion', function(req, res) {
        let Controller = require("../controllers/SignIn.js")
        let Connect = new Controller();
        Connect.deconnect(req, res);
    })
}
