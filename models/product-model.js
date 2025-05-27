const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

const productSchema = moongoose.Schema({
    image : Buffer,// as a hexadecimal value
    name : String , 
    price : Number ,
    discount : {
        type : Number,
        default : 0,
    },
    bgcolor : String,
    panelcolor : String,
    textcolor : String,
});


module.exports = mongoose.model('product',productSchema);