const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const mongoose = require('../../util/mongoose');

class RegisterController{

    // [GET] /register
    register(req, res, next){
        res.render('register/register');
        
    }

    // [POST] /register/store
    registerStore(req, res, next){

        const user = new User(req.body);
        user.save()
            .then(() => res.redirect('/'))
            .catch(err => {
                
            });
    }

    

}

module.exports = new RegisterController;
