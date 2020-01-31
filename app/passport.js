const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
//… Incluez la strategy ici
module.exports = (app) => {
   app.use(passport.initialize())
   app.use(passport.session())

   passport.serializeUser((user, cb) => {
    cb(null, {})
});

  
   passport.use(new GoogleStrategy({
    clientID: "699386021700-fgbf921710o6p0dif5f25hvgisghnltm.apps.googleusercontent.com",
    clientSecret: "O0pdOOYWDnJxpxrYekBBEto3",
    callbackURL: "/connexion/google/callback",
    passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
    
    // exemple d'utilisation de request
    request.session.user = {
        connected : true,
        id: profile.id,
        firstname : profile.name.givenName,
        lastname : profile.name.familyName
    }
    request.flash('info', 'Vous êtes bien connecté !!');
    return done(null, request.session.user);
}
));

 
passport.deserializeUser((id, cb) => {
    cb(null, {})
});

   
}