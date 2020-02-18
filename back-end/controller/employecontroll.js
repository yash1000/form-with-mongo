const  express= require('express'); 
var router= express.Router();
var objectid = require('mongoose').Types.ObjectId;
var { Employee}=require('../models/model');
var { Employee1}=require('../models/model');
const {mongoose}=require('../db');

router.get('/',(req,res)=>{

    
    Employee.find((err,docs)=>
    {
        if(!err){
            res.send(docs);
        }
        else{
            console.log('error in employee retrevation'+JSON.stringify(err,undefine,2));
        }
    });
});

router.get('/:id',(req,res)=>{
    if(!objectid.isValid(req.params.id))
    return res.status(400).send('no record found:'+req.params.id);

    Employee.findById(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs);
            
        }
        else{
            console.log('error in employee retrevation'+JSON.stringify(err,undefine,2));
        }
    });
});

router.post('/',(req,res)=>{
    var emp =new Employee({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        Emailid:req.body.Emailid,
        password:req.body.password,
      
    });
    console.log(req.body)

    Employee.findOne({Emailid:emp.Emailid},(err,docs)=>{
        if(docs){
            res.send({
                status:0,
                message: "sorry user already registerd"
            })
        }
        else{
            emp.save((err,docs)=>{
                if(!err){
                    res.send({
                        status:1,
                        message: docs,
                    });
                }
                else{
                    console.log('error in employee retrevation'+JSON.stringify(err,undefine,2));
                }
            });
        }
    })
        
});


// router.post('/',(req,res)=>{
//     var emp =new Employee1({
//         Emailid1:req.body.Emailid1,
//         password1:req.body.password1,
//     });
//     console.log(req.body)
//     emp.save((err,docs)=>{
//         if(!err){
//             res.send(docs);
//         }
//         else{
//             console.log('error in employee retrevation'+JSON.stringify(err,undefine,2));
//         }
//     });
// })

// router.post('/checkuser',(req,res)=>{
//     console.log("sdfghjkfjk")
//     console.log(req.body);
//     var email = req.body.email;
//     var pass = req.body.password;
  
    
//     Employee.findOne({Emailid:email},(err,docs)=>{
//         if(!docs){
//             res.send({
//                 status: 0,
//                 message: 'not found'
//             });
//         }else{
//            if(pass==docs.password){
//             res.send({
//                 message:'right password'
//             })
//            }
//         }
//     });
//     });

router.put('/:id',(req,res)=>{
    if(!objectid.isValid(req.params.id))
    return res.status(400).send('no record found    ==:'+req.params.id);

    var emp ={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
    }
    Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,docs)=>{
        if(!err){
        res.send(docs);
    }
    else{
        console.log('error in employee retrevation'+JSON.stringify(err,undefine,2));
    }
});
});



module.exports=router;