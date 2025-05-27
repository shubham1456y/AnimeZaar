const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

const userSchema = moongoose.Schema({
    fullname : {
        type : String,
        minLength : 3,
        trim : true,
    },
    email : String , 
    password : String ,
    cart : [{
        type : moongoose.Schema.Types.ObjectId,
        ref : 'product',
    }],
    orders:{
        type : Array,
        default : [],
    },
    contact : Number,
    picture : String,
});


module.exports = mongoose.model('user',userSchema);