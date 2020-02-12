const mongoose=require('mongoose');

var Employee1 = mongoose.model('Employee1',{
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    contact:{type:String},
    gender:{type:Boolean}

})

module.exports = {Employee1};