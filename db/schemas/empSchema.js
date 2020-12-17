const mongoose=require("../connect");

const Info=new mongoose.Schema({
    contactDate: Date,
    empId: String
})
 
const emp= new mongoose.Schema({
     empId:String,
     name:String,
     location:String,
     designation:String,
     department:String,
     status:{
         type:String,
         default:"Healthy"
     },
     contacts:[Info]
 },{timestamps:true})

module.exports={
    emp:mongoose.model('employees',emp)
}