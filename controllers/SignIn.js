module.exports = class SignIn {


    printForm(req,res)
    {
        res.render('signin')
    }
    deconnect(req,res)
    {
        req.session.user = null;
        res.redirect('/')
    }



    async process(req,res)
    {
        let UserModel = require('../models/User.js')
        let User = new UserModel();

     
        let user = await User.connect(req.body.email, req.body.password);
        if(user) {
            // res.render('index.pug', { connect: "Vous êtes connecté" })
            req.session.login = true;
            req.session.user = {
                id: user._id,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email
            }
            console.log(user+'ok');
            req.flash('info', 'Connection réussie');
            res.redirect('/')
        }
        console.log(user+' no');
        req.flash('info', 'Connection non réussie');
        res.redirect('/connexion')
    }
    
}