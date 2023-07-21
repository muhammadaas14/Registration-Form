const mongoose = require ('mongoose');
const connectdb = async ()=>{
    mongoose.set('strictQuery',false);
    const con = await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    console.log(`connection established on ${con.connection.host}`);
}

module.exports = connectdb