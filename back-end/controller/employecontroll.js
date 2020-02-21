const  express= require('express'); 
var router= express.Router();
var objectid = require('mongoose').Types.ObjectId;
var { Employee}=require('../models/model');
var { Employee1}=require('../models/model');
const {mongoose}=require('../db');
var nodemailer = require('nodemailer');
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



//   transporter.verify((err, success) => {
//     if (err){ console.error(err);}
//     else{
//     console.log('Your config is correct');}
// });









// var transporter = nodemailer.createTransport(smtpTransport({
//     debug: false,
//     requireTLS: true,
//     host: 'smtp.gmail.com',
//     port: 25,
//     secureConnection: false,
//     auth: {
//         user: 'yashs.inexture@gmail.com',
//         pass: 'yash@1000'

//     },
//     tls: {
//         ciphers:'SSLv3',
//         rejectUnauthorized: false
//     }
// }));

//  transporter.sendMail({
//         from: "yashs.inexture@gmail.com",
//         to: "yashsanja1@gmail.com",
//         subject: "Subject goes here",
//         text: "Your text here"
//         }, function(error, response) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email was successfully sent.');
//         }
//         });





















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