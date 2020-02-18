const express = require('express');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const gridfsstorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const methodoverride = require('method-override');
var { Employee}=require('./models/model');
var router =express.Router();
const bodyparser = require('body-parser');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const {mongoose}=require('./db');

var employeecontroller =require('./controller/employecontroll');
const app = express();
const cors =require('cors');
const jwt=require('jsonwebtoken');

app.use(bodyparser.json());
app.use(methodoverride('_method'));
app.use(cors({ origin:'http://localhost:4200'}));
app.use(bodyparser.urlencoded({
    extended:true
}))
app.listen(8000,()=>console.log('serverstarte on : 8000'));













/**
 * implimented code
 */




//set storage engine
const storage =multer.diskStorage({
    destination:'./public/upload',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' +Date.now() + path.extname(file.originalname));
    }
})
//init upload
const upload= multer({
    storage:storage,
    limits:{fileSize:10000000},
    fileFilter:function(req,file,cb){
        checkfiletype(file,cb);
    } 
}).single('file')

// app.get('/',(req,res)=>console.log("jjjjjjjjjjjjjjjjjjjjjjj"));
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


// app.use(express.static('./public'));

app.post('/upload',(req,res,next)=>{
// upload(req,res,(err)=>{
//     if(err){
//         return res.status(501).json({error:err});
//     }
// res.json({originalname:req.file.originalname,uploadname:req.file.filename})
// })







var emp =new Employee({
    fieldname:req.body.fieldname,
    originalname:req.body.originalname,
    encoding:req.body.encoding,
    mimetype:req.body.mimetype,
    destination:req.body.destination,
    filename:req.body.filename,
    path:req.body.path,
    size:req.body.size  
});















    // res.send('test');
    // console.log("werrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    // console.log(req)
    upload(req,res,(err) =>{
           var emp =new Employee({
            fieldname:req.file.fieldname,
            originalname:req.file.originalname,
            encoding:req.file.encoding,
            mimetype:req.file.mimetype,
            destination:req.file.destination,
            filename:req.file.filename,
            path:req.file.path,
            size:req.file.size  
        });
if(err){
    res.send({
        msg:err
    });
}
// else{
//     res.json({originalname:req.file.originalname,uploadname:req.file.filename})
// }
else{
   if(req.file==undefined){
    res.send({
        msg:"error :no file selected"
    });
   }else{

















    
    //    var y='';
    // res.sendFile('./public/upload/file-1582012598581.jpg');
    // console.log()
       console.log(emp)
    // res.send({
    //     msg:"file uploaded",
    //     msg:req.file.mimetype,
    //     file:`./public/upload/${req.file.filename}`,
    // });
    
    var v=`./public/upload/${req.file.filename}`
        res.sendfile(v);
   }
}
    })
})
















































// const mongouri = 'mongodb://localhost:27017/formdb';
// // const conn = mongoose.createConnection(mongouri);




// let gfs;
// Employee.once('open',()=>{
//   gfs = Grid(conn.db, mongoose.mongo);
// gfs.collection('uploads');
  
// })
// const storage = new gridfsstorage({
//     url:'mongodb://localhost:27017/formdb',
//     file: (req,res)=>{
//         return new Promise((resolve,reject)=>{
//             crypto.randomBytes(16,(err,buf)=>{
//                 if(err){
//                     return reject(err);
//                 }
//                 const filename =buf.toString('hex')+path.extname(file.orginalname);
//                 const fileinfo={
//                     filename:filename,
//                     bucketname:'uploads'
//                 };
//                 resolve(fileinfo);
//             })
//         })
//     }
// })
// const upload=multer({ storage });


// app.post('/upload',upload.single('myfile'),(req,res)=>{
//     console.log(req.file)
// res.json({file:req.file});
// })

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
//     });
//     const storage = cloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: "demo",
//     allowedFormats: ["jpg", "png"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }]
//     });
    // const parser = multer({ storage: storage });


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


// app.post('/api/images', parser.single("image"), (req, res) => {
//   console.log(req.file) // to see what is returned to you
//   const image = {};
//   image.url = req.file.url;
//   image.id = req.file.public_id;
//   Image.create(image) // save image information in database
//     .then(newImage => res.json(newImage))
//     .catch(err => console.log(err));
// });
app.post('/editprofile',(req,res)=>{
    // var empupdate ={
    
    //     firstName:req.body.firstname,
    //     lastName:req.body.lastname,
    //     Emailid:req.body.email,
    //     contact:req.body.contact,
    //     gender:req.body.gender
    // }    
    
    // Employee.updateOne(
    //     {_id:req.body._id},
    //     {$set:req.body},
    // {upsert: false }, (err, res) => {
    //        console.log(res+"response");
    //        console.log(res)
    //        console.log(err)+"error";
    //     }
    // )

    console.log(req.body);

    // Employee.update(
    //     {contact:req.body.contact},
    //     {gender:req.body.gender})
        // console.log(Employee.body);
        // console.log("oooooooooooooooooooooooooooooooooooooooooooooooo")
    Employee.findOneAndUpdate({_id:req.body._id},{$set:req.body},{new:true,upsert: true },(err,docs)=>{
console.log(req.body);  
console.log("----------------"+req.body._id)
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










//     app.post('/email',(req,res)=>{
//         var emp =new Employee({
           
//             image:req.body.image,
            
//         } );


//         console.log(req.body)



//         Employee.findOneAndUpdate({_id:req.body._id},{$set:req.body},{new:true,upsert: true },(err,docs)=>{
// if(docs){
//     res.send({
//         status:1,
//         message: docs
//         // token:token
//     }) 
// }
// else{
//     res.send({
//         status: 0,
//         message: 'not found'
//     })
// }
//         })
//     });
    






app.use('/employee',employeecontroller)