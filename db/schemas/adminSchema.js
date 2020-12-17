const mongoose=require("../connect");

 const admin= new mongoose.Schema({
     email:String,
     password:String,
 },{timestamps:true})

module.exports={
    admin:mongoose.model('admins',admin)
}