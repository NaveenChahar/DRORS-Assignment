const AdminSchema=require('../schemas/adminSchema');
const EmpSchema=require('../schemas/empSchema');

const adminCrud={
    login(obj){
        //return new Pr
        console.log(obj);
        if(obj.email=='admin@gmail.com' && obj.password=='admin123'){
            return true;
        }
        else{
            return false;
        }
    },
    getAllEmployees(){
        return new Promise((resolve,reject)=>{
            EmpSchema.emp.find({},(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    //console.log(result[0])
                    resolve(result);
                }
            })
        })
    }
    ,
    covidStatus(){
        return new Promise((resolve,reject)=>{
            EmpSchema.emp.find({status:'Covid'},(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })
    },
    quarantinedStatus(){
        return new Promise((resolve,reject)=>{
            EmpSchema.emp.find({status:'Quarantined'},(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })
    },
    markCovid(id){
        return new Promise((resolve,reject)=>{
            EmpSchema.emp.findOneAndUpdate({empId:id},{status:'Covid'},(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })
    },

    uploadEmployees(results){
        return new Promise(function(resolve,reject){
            let arr=[];
            for(let result of results){
                let obj=new EmpSchema.emp();
                obj.empId=result['employee id'];
                obj.name=result.name;
                obj.location=result.location;
                obj.designation=result.designation;
                obj.department=result.department;
                arr.push(obj);
            }
            EmpSchema.emp.insertMany(arr,(err,objects)=>{
                if(err){
                    console.log(err)
                    reject();
                }
                else{
                    //console.log(objects)
                    resolve(objects)
                }
            })
        })
    }
}

module.exports=adminCrud