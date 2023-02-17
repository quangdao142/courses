const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const mongoose = require('../../util/mongoose');

class LoginController{

    // [GET] /login
    login(req, res, next){
        
        res.render('login/login');
        
    }

    // [POST] /login
    async loginAuth(req, res, next){
        const user = await User.findOne({email: req.body.email});
        if (!user) 
            return response.status(422).send('Email or Password is not correct');
        if(user.password != req.body.password)
            return response.status(422).send('Email or Password is not correct');

        res.cookie('email',user.email, { maxAge: 900000, httpOnly: true });
        return res.redirect('/?email='+user.email);
        
    }

}

module.exports = new LoginController;
