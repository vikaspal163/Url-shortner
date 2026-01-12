import mongoose from "mongoose";
 try{
await mongoose.connect("mongodb://localhost:27017/mongoose_middleware");
 }catch(error){
console.error(error);
process.exit();
 }

 const userSchema = mongoose.Schema({
     name:{type:String,required:true},
     email:{type:String,required:true,unique:true},
     age:{type:Number,required:true,min:5},
    //  createdAt:{type:Date,default:Date.now()},//no need of this
    //  updatedAt:{type:Date,default:Date.now()},//no need of this
 },
{
    timestamps:true,//instead just use this
}
);
//use middleware before creating model//no need of this 
//  userSchema.pre(["updateOne",["updateMany","findOneAndUpdate"]],function(next){
//     this.set({updatedAt:Date.now()});
//     next();
//  })


 const Users = mongoose.model("user",userSchema);

 
//  await Users.create({name:"thapa",age:31,email:"thapa@technical.com"});

await Users.updateOne({email:"thapa@technical.com"},{$set:{age:32}}); 

 await mongoose.connection.close();