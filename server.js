const express   =require('express')
const path      =require('path')
const bodyParser = require('body-parser')
const mongoose=require('mongoose')
const User=require('./model/user')
const User1=require('./model/loginuser')
const jwt =require('jsonwebtoken')
const JWT_SECRET='sdgdhdjffodroe!@#%^&^&**kfcldldprpfkdleoefkk'
const bcrypt  =require('bcryptjs')
const regex = require('regex')
//TOKEN_KEY="sdgdhdjffodroe!@#%^&^&**kfcldldprpfkdleoefkk"

mongoose.connect('mongodb://localhost:27017/testdb',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true})

const app   =express()

app.use('/',express.static(path.join(__dirname,'static')))

app.use(bodyParser.json())

//to generate Token//
app.post('/api/login',(req, res, next) => {
    User.findOne({ username: req.body.username }).then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }
            const token = jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' });
            res.status(200).json({
              userId: user._id,
              token: token
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  })

//To register User.
app.post('/api/register',async(req,res)=>{
   console.log(res.body)
   //console.log(res)
    const {
         FirstName,
         LastName,
         MobileNo,
        Address,
        Email,
        username,password:plainTextPassword}=req.body

    const password =await bcrypt.hash(plainTextPassword,10)
        try {
           const response= await User.create({
                username,
                password,
                 FirstName,
                 LastName,
                MobileNo,
                 Address,
                 Email
            })
            console.log('user created successfully!!!!!!!!!!!!!!!!!:',response);
        } catch (error) {
            console.log(error);
            return res.json({status:'error'})
        }


      // console.log(await bcrypt.hash(password,10))
//    User.
    res.json({
        status:'ok'
    })
})

//search API
app.get('/api/search:FirstName',function(req,res){
    var regex = new RegExp(req.params.FirstName,'i');
    User.find({FirstName:RegExp}).then((result)=>{
            res.status(200).json(result)
    })
})


// ///////////////////

app.listen(9001,()=>{
    console.log("Server started!!!!!!!!!!!")
})