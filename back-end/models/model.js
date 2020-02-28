const mongoose=require('mongoose');

var Employee = mongoose.model('Employee',{
    firstName:{type:String},
    lastName:{type:String},
    Emailid:{type:String},
    password:{type:String},
    contact: {type: String},
    gender: {type: String},
    filename:{type:String},
    token:{type:String},
    name:{type:String},
    photourl:{type:String},
    // authToken:{type:String},
    // idToken:{type:String},
    // provider:{type:String}
})

module.exports = {Employee};