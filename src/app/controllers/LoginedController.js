const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const mongoose = require('../../util/mongoose');

class LoginedController{

    // [GET] /login
    logined(req, res, next){
        
        res.render('logined');
        
        
    }


}

module.exports = new LoginedController;
