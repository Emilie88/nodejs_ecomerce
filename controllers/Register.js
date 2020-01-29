const crypto =    require('crypto');
const UserMongo = require('../models/UserMongoDB.js')

module.exports = class Register {
    
    printForm(req, res) {
        res.render('user_register')
    }

    process(req, res) {
 // Nous utilisons le schéma User
        var user = new UserMongo();
        
       
        // Nous récupérons les données reçues pour les ajouter à l'objet User
        user.civilite =  req.body.civilite;
        user.nom = req.body.nom;
        user.prenom =  req.body.prenom;
        user.mail = req.body.email;
        user.password = crypto.createHash('sha1')
        .update( req.body.password)
        .digest('hex');
        
        
        //Nous stockons l'objet en base
        user.save(function(err){
            if(err){
            res.send(err);
            }
            res.send({message : 'Bravo...'});
        })
    }
}