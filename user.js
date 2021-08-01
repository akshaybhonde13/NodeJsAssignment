const mongoose=require('mongoose')

const UserSchema    = new mongoose.Schema({
    
    FirstName: {type:String,required:true},
      LastName:{type:String,required:true},
      Email:{type:String,required:true},
     MobileNo:{type:String,required:true},
      username:{type:String,required:true,unique:true},
     password:{type:String,required:true},
     
},
{collection:'users'}
)

const model=mongoose.model('UserSchema',UserSchema)

module.exports=model