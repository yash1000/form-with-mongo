const express = require('express');
const path = require('path'); 
const multer = require('multer');
var router= express.Router();
const methodoverride = require('method-override');
var { Employee}=require('./models/model');
const bodyparser = require('body-parser');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
 
const {mongoose}=require('./db');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var employeecontroller =require('./controller/employecontroll');
const app = express();
const cors =require('cors');
const jwt=require('jsonwebtoken');
var nodemailer = require('nodemailer');
app.use(bodyparser.json());
app.use(methodoverride('_method'));
app.use(cors({ origin:'http://localhost:4200'}));
app.use(bodyparser.urlencoded({
    extended:true
}))
app.listen(8000,()=>console.log('serverstarte on : 8000'));




//using folder statically
app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/public/upload'));



//multer storage method
const storage =multer.diskStorage({
    destination:'./public/upload',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' +Date.now() + path.extname(file.originalname));
    }
})

//init upload for multer
const upload= multer({
    storage:storage,
    limits:{fileSize:10000000},
    fileFilter:function(req,file,cb){
        checkfiletype(file,cb);
    } 
}).single('file')

//validation in multer
function checkfiletype(file,cb){
const filetype= /jpeg|jpg|png|gif/;
const extname =filetype.test(path.extname(file.originalname).toLowerCase());
const mimetype = filetype.test(file.mimetype);
if(mimetype && extname){
    return cb(null,true)
}else{
    cb('ERROR:images only');
}
}

//delete api
app.post('/delete',verifyToken,(req,res)=>{
    res.send(req.body)
    Employee.findOneAndDelete({_id:req.body.id},(err,docs)=>{
    if(docs){
        console.log("remove successfully")
    }
    else{
        console.log("not removed")
    }
    })
})


//upload image in multur api
app.post('/upload', verifyToken, (req, res, next) => {
  var emp = new Employee({
    fieldname: req.body.fieldname,
    originalname: req.body.originalname,
    encoding: req.body.encoding,
    mimetype: req.body.mimetype,
    destination: req.body.destination,
    filename: req.body.filename,
    path: req.body.path,
    size: req.body.size
  });
  upload(req, res, (err) => {
    var emp = new Employee({
      _id: req.body._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      Emailid: req.body.Emailid,
      contact: req.body.contact,
      gender: req.body.gender,
      filename: req.file.filename,
    });
    Employee.findOneAndUpdate({
      _id: req.body._id
    }, {
      $set: emp
    }, {
      new: true,
      upsert: false
    }, (err, docs) => {
      if (err) {
        res.send({
          msg: err
        });
      } else {
        if (req.file == undefined) {
          res.send({
            msg: "error :no file selected"
          });
        } else {
          //file send code
          // console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
          //        console.log(emp)
          //        console.log(emp._id)
          //        console.log("docs from response")
          //            console.log(docs)
          //     var v=`./public/upload/${docs.filename}`
          //     var f=
          //         res.sendfile(v);

          var imageurl = "http://localhost:8000/images/" + (docs.filename);

          res.send({
            msg: imageurl
          })
        }
      }
    })
  })
})

//login api
app.post('/checkuser', (req, res) => {
  var email = req.body.Emailid1;
  var pass = req.body.password1;
  var user = {
    name: email,
    pass1: pass
  }
  Employee.findOne({
    Emailid: email
  }, (err, docs) => {
    if (docs) {
      if (docs.password == pass) {
        jwt.sign(user, 'secretkey', (err, token) => {
          res.send({
            status: 1,
            message: docs,
            token: token
          })
        })
      } else {
        res.send({
          status: 2,
          message: "Credentials Invalid"
        })
      }

    } else {
      res.send({
        status: 0,
        message: 'not found'
      })
    }
  })
})

//update employees api
app.post('/updateinlist', verifyToken, (req, res) => {
  upload(req, res, (err) => {
    var emp = new Employee();
    emp ={
        _id: req.body._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Emailid: req.body.Emailid,
        contact: req.body.contact,
        gender: req.body.gender,
      }
      if (req.file != null || req.file != undefined) {
        if (req.file.filename != null || req.file.filename != undefined) {
          emp.filename = req.file.filename;
        }
      }
    Employee.findOneAndUpdate({
      _id: req.body._id
    }, {
      $set: emp
    }, {
      new: true,
      upsert: false
    }, (err, docs) => {
      if (err) {
        res.send({
          msg: "sorry"
        })
      } else {
        res.send({
          msg: "success"
        })
      }

    })
    if (err) {
      console.log("err")
      console.log(err)
    } else {}
  })
})


function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, 'secretkey', (err, authData) => {

      var user = authData.name;
      Employee.findOne({
        Emailid: user
      }, (err, docs) => {
        if (err) {
          res.sendStatus(403);
        } else {
          next();
        }
      })
    })
  }
}

//reset passeord api
app.post('/reset', (req, res) => {
  Employee.findOneAndUpdate({token: req.body.token},{$set:{"password":req.body.password}},{new:true}, (err, docs) => {
    if (docs) {
      res.send({
        message:"successfully changed"
      })
      Employee.collection.update({},{
        $unset:{token:""}
      });
    } else {
      console.log(err)
      console.log("did not find")
      res.send({
        message:"error"
      })
    }
  })
})
app.post('/email', (req, res) => {

  console.log(req.body)
  const encryptedString = cryptr.encrypt(req.body);
  console.log(encryptedString);
  var emp = {
    token: encryptedString
  }
  Employee.findOneAndUpdate({
    Emailid: req.body.Emailid1
  }, {
    $set: emp
  }, {
    new: true
  }, (err, docs) => {
    if (docs) {
      console.log(docs)
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
        subject: 'Password change',
        html: `<a href="http://localhost:4200/resetpassword?token=${encryptedString}">http://localhost:4200/resetpassword?token=${encryptedString}</a>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("err is")
          console.log(error);
          res.send({
            message:"Error in sending email!"
          })
        } else {
          console.log('Email sent: ' + info.response);
          res.send({
            message:"email send successfully!"
          })
        }
      });
    } else {
      console.log(err)
      console.log("did not find")
      console.log("inside find")
      res.send({
        message:"Error in sending email!"
      })
    }
  })
});
app.use('/employee',employeecontroller)