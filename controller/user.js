const mongoose = require('mongoose')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const employeeschema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]
})
employeeschema.methods.createtoken = async function(){
    const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
    this.tokens.push({token});
    await this.save();
};
employeeschema.pre("save",async function(next){
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})


module.exports= mongoose.model('Register',employeeschema);