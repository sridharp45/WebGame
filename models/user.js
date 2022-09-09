const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    HighestScore:{
        type:Number,
        default:0
    }
})

UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',UserSchema);
