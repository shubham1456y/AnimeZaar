const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

const ownerSchema = moongoose.Schema({
    fullname : {
        type: String,
        minLength : 3,
        trim : true,
    },
    email : String , 
    password : String ,
    products:{
        type : Array,
        default : [],
    },
    picture : String,
        gstin : String, 
});


module.exports = mongoose.model('owner',ownerSchema);