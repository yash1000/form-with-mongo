const mongoose=require('mongoose');

var Employee = mongoose.model('Employee',{
    firstName:{type:String},
    lastName:{type:String},
    Emailid:{type:String},
    password:{type:String},
    contact: {type: String},
    gender: {type: String},
    // imageURL: {type:String},
    // fieldname:{type:String},
    // originalname:{type:String},
    // encoding:{type:String},
    // mimetype:{type:String},
    // destination:{type:String},
    filename:{type:String},
    // path:{type:String},
    // size:{type:Number}  
})

module.exports = {Employee};