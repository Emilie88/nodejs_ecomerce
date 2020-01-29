const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    cicvilite: {type: String},
    nom: {type: String}, 
    prenom: {type: String},
    email: {type: String},  
    password: {type: String}
}); 
 


module.exports = mongoose.model('User', userSchema); // User devient users à la création de la collection


