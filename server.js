const express = require('express');
const app = express();
require('dotenv').config();
const jwt = require('jsonwebtoken')
let env = require('dotenv');
const path = require ('path');
const person = require('./controller/user')
const connectdb = require('./controller/conn');
const { verify } = require('crypto');
const cookieParser = require('cookie-parser');
connectdb();
app.set("views",path.join(__dirname,('./view')));
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(cookieParser());
const port = process.env.PORT||4000
app.get('/',(req,res)=>{
    res.render('index')
});
app.get('/multicoloumn',(req,res)=>{
res.render('multicoloumn');
})
app.get('/secret',(req,res)=>{
  res.render('secret');
  })
app.post('/register',async(req,res)=>{

  try {
      const user = new person({
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          email:req.body.email,
          password:req.body.password,
          confirmpassword:req.body.confirmpassword
          
      });
      console.log("the success part is" + user)
      const token = await user.createtoken();
      // generating cookies
      res.cookie("jwt",token,{
expires:new Date(Date.now()+3000),
httpOnly:true


      });
     
      await user.save();
      res.status(201).render("multicoloumn");
      
  } catch (error) {
    console.log(error)
  };
    
});

// checking token for authentication
const createtoken = ()=>{
  const token = jwt.sign({_id:"64b67d208795bc26dba86099"},process.env.SECRET_KEY)
  console.log(token)
  const server = jwt.verify(token,process.env.SECRET_KEY)
  console.log(server);

}
createtoken();
app.listen(port,()=>{
    console.log(`server established on ${port}`)
})