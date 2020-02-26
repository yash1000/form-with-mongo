const mongoose=require('mongoose');

var Employee = mongoose.model('Employee',{
    firstName:{type:String},
    lastName:{type:String},
    Emailid:{type:String},
    password:{type:String},
    contact: {type: String},
    gender: {type: String},
    filename:{type:String},
})

module.exports = {Employee};