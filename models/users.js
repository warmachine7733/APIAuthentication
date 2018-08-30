const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create schema
const userSchema = new Schema({
    email:{type:String,required:true,lowercase:true},
    password:{type:String,required:true}
})

//create model
const user = mongoose.model('user',userSchema)


//export model
module.exports = user;