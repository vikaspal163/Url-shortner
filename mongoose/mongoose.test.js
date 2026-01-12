import mongoose from "mongoose";

//step1: to connect to the mongodb server
try {
    await mongoose.connect("mongodb://localhost:27017/mongoose_database"); 
    mongoose.set("debug",true);//used for console or displaying data
} catch (error) {

    console.error(error);
    process.exit();
}
//step2: Create schema
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:Number,required:true,min:5},
    createdAt:{type:Date,default:Date.now()},
})

//Step 3: Create a model(collection)

const Users = mongoose.model("user",userSchema);//user is collection name that is singular here but will be converted to plural in database//const Users can be used for CRUD operation

await Users.create({name:"thapa",age:31,email:"thapa@technical.com"});

await mongoose.connection.close();

