const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport')
//… Incluez la strategy ici
module.exports = (app) => {
   app.use(passport.initialize())
   app.use(passport.session())

   passport.serializeUser((user, cb) => {
    cb(null, {})
});

  
   passport.use(new GitHubStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "/connexion/github/callback",
    passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
    
        request.session.user = {
            connected : true,
            firstname : profile.name,
            lastname : ''
        }

    request.flash('info', 'Vous êtes bien connecté !!');
    return done(null, request.session.user);
}
));

 
passport.deserializeUser((id, cb) => {
    cb(null, {})
});

   
}