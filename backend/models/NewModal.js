const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    dob:{
        type:Date,
        required:true
    }
},
    {timestamps:true}
);

const UserModel = mongoose.model('UserModel',userSchema);

module.exports = UserModel;