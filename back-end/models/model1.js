const mongoose=require('mongoose');

var Employee = mongoose.model('Employee',{

    Emailid1:{type:String},
    password1:{type:String},

})

module.exports = {Employee1};