const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/formdb',{useNewUrlParser: true},(err)=>{
if(!err){
    console.log('connection success.');
}
else{
    console.log('error in connection'+JSON.stringify(err,undefined,2))    
}
})

module.exports=mongoose;