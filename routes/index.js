const express = require('express');
const router = express.Router();
const isLoggedin  = require("../middlewares/isLoggedIn");
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/',function(req,res){
    let error = req.flash('error');
    res.render('index',{error,loggedin : false});
});

router.get('/shop',isLoggedin,async function(req,res){
    let products = await productModel.find() ;
    let success = req.flash('success');
    res.render('shop',{products,success});
});

router.get('/cart',isLoggedin,async function(req,res){
    let user = await userModel.findOne({email:req.user.email}).populate('cart');

    if (!user || !user.cart.length) {
        req.flash('error', 'Your cart is empty');
        return res.redirect('/shop');
    }

    // Calculate total bill for all cart items
    let bill = user.cart.reduce((total, item) => {
        return total + (Number(item.price) + 20 - Number(item.discount));
    }, 0);
    
    res.render('cart',{user,bill});
});
 
router.get('/addtocard/:productid',isLoggedin,async function(req,res){
   let user = await userModel.findOne({email:req.user.email});
   user.cart.push(req.params.productid);
   await user.save();
   req.flash('success','Added to cart');
   res.redirect('/shop');
});
module.exports = router;
