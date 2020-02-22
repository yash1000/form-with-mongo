const  express= require('express'); 
var router= express.Router();
var objectid = require('mongoose').Types.ObjectId;
var { Employee}=require('../models/model');
var { Employee1}=require('../models/model');
const {mongoose}=require('../db');
var nodemailer = require('nodemailer');

//router set
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

//registration api
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
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                          user: 'noreply13644@gmail.com',
                          pass: 'yash@1000'
                        }
                      });
                      
                    
                      var mailOptions = {
                        from: 'noreply13644@gmail.com',
                        to: docs.Emailid,
                        subject: 'Successfully registered',
                        text: `your username is ${docs.firstName} ${docs.lastName}
your password is ${docs.password}`,
                      };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log("err is")
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                }
                else{
                    console.log('error in employee retrevation'+JSON.stringify(err,undefine,2));
                }
            });
        }
    })
        
});


module.exports=router;