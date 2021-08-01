 const mongoose=require('mongoose')

 const UserSchema1    = new mongoose.Schema({
    
    
    
      username:{type:String,required:true,unique:true},
     password:{type:String,required:true},
     
 },
 {collection:'users'}
 )

 const model=mongoose.model('UserSchema1',UserSchema1)

 module.exports=model