const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;

        // Check if fullname has at least 3 characters
        if (!fullname || fullname.length < 3) {
            req.flash('error', 'Full Name must be at least 3 characters long.');
            return res.redirect('/');
        }

        let user = await userModel.findOne({ email: email });
        if (user) {
            req.flash('error', 'You already have an account.');
            return res.redirect('/');
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    req.flash('error', err.message);
                    return res.redirect('/');
                } else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });

                    let token = generateToken(user);
                    res.cookie('token', token);
                    res.redirect('/shop');
                }
            });
        });

    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/');
    }
};


module.exports.loginUser = async function(req,res){
    let{email,password} = req.body; 
    let user = await userModel.findOne({email:email});
    if(!user) return res.send('Email or Password incorrect');

    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token = generateToken(user);
            res.cookie('token',token);
            res.redirect('/shop');
        }
        else{
            req.flash('error',"Email or Password incorrect");
            return res.redirect('/');
        }
    });

};

module.exports.logout = function(req,res){
    res.cookie('token','');
    res.redirect('/');
}