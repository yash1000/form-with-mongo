const express = require('express');
var { Employee}=require('./models/model');
var { Employee1}=require('./models/model1');
const bodyparser = require('body-parser');
const {mongoose}=require('./db');
var employeecontroller =require('./controller/employecontroll');
const app = express();
const cors =require('cors');
const jwt=require('jsonwebtoken');
app.use(bodyparser.json());
app.use(cors({ origin:'http://localhost:4200'}));
app.use(bodyparser.urlencoded({
    extended:true
}))
app.listen(8000,()=>console.log('serverstarte on : 8000'));
app.post('/checkuser',(req,res)=>{
    var email = req.body.Emailid1;
    var pass = req.body.password1;
    var user = { name: email,pass1:pass}
    console.log("sdfghjkfjk")
    console.log(req.body);
    
    Employee.findOne({Emailid:email},(err,docs)=>{
        console.log("DOCS");
        console.log(docs)
        if(docs){

            if(docs.password == pass){
                jwt.sign(user,'secretkey',(err,token)=>{
               
                res.send({
                    status:1,
                    message: docs,
                    token:token
                }) })
            }else{
                res.send({
                    status:2,
                    message: "Credentials Invalid"
                })
            }
            
        }else{
            res.send({
                status: 0,
                message: 'not found'
            })
        }
    })
    })

/**
 * user with token
 */
// app.get('/username',varifyToken,function(req,res,next){
// return res.status(200).json(decodedtoken.name)
// })
// var decodedtoken='';
// function varifyToken(req,res,next){
// let token = req.query.token;
// console.log(token);

// jwt.verify(token,'secretkey',function(err,tokendata){
// if(err){
//     return res.status(400).json({message:"unouthorized"})
// }
// if(tokendata){
//     decodedtoken=tokendata;
//     next();
// }
// })
// }









    // app.post('/spp/post',verifyToken,(req,res)=>{
    //     res.json({
    //         message:"post created"
    //     })
    //     jwt.verify(req.token,'secretkey',(err,authdata)=>{
    //         if(err){
    //             res.sendStatus(403);
    //         }
    //         else{
    //             res.json({
    //                 message:"welcome",
    //                 authdata
    //             })
    //         }
    //     });
      
    // })


    // app.post('/userdetail',verifyToken,(req,res)=>{
    //     res.json({
    //         message:"welcome"
    //     })
    // })

// function verifyToken(req,res,next){
//     const brh=req.headers['authorization'];
//     if(typeof brh !== 'undefined'){
//         const brr=brh.split(' ');
//         const bry=brr[1];
//         req.token=bry;
//         next();
//     }
//     else{
//         res.sendStatus(403);
//     }
// }



app.post('/editprofile',(req,res)=>{
    // var empupdate ={
    
    //     firstName:req.body.firstname,
    //     lastName:req.body.lastname,
    //     Emailid:req.body.email,
    //     contact:req.body.contact,
    //     gender:req.body.gender
    // }
    // console.log(req.body);

    Employee.update(
        {contact:req.body.contact},
        {gender:req.body.gender})
        // console.log(Employee.body);
        // console.log("oooooooooooooooooooooooooooooooooooooooooooooooo")
    Employee.findOneAndUpdate({Emailid:req.body.Emailid},{$set:req.body},{new:true,upsert: true },(err,docs)=>{
console.log(req.body);  

console.log("****************************")
        // Employee.findOne({Emailid:empupdate.Emailid})
        console.log(docs)
        if(docs){
            // docs=req.body;
                res.send({
                    status:1,
                    message: docs
                    // token:token
                }) 
        }else{
            res.send({
                status: 0,
                message: 'not found'
            })
        }


    })
    });









app.use('/employee',employeecontroller)