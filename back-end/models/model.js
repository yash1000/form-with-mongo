const mongoose=require('mongoose');

var Employee = mongoose.model('Employee',{
    firstName:{type:String},
    lastName:{type:String},
    Emailid:{type:String},
    password:{type:String},
})

module.exports = {Employee};