const express = require('express');
var { Employee}=require('./models/model');
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
    console.log("sdfghjkfjk")
    console.log(req.body);
    
    Employee.findOne({Emailid:email},(err,docs)=>{
        console.log("DOCS");
        console.log(docs)
        if(docs){

            if(docs.password == pass){
                jwt.sign({email},'secretkey',(err,token)=>{
               
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


    app.get('/userdetail',(req,res)=>{
        res.json({
            message:"welcome"
        })
    })


app.use('/employee',employeecontroller)