const express=require('express')
const app=express()
const mongoose=require('mongoose')
const validator=require('validator')
mongoose.connect(process.env.MONGODB_URL,
{
 useNewUrlParser:true,
 useCreateIndex:true

})
const taskSchema =new mongoose.Schema({
    name:
{
    type:String,
    required:true
},
rollno :
{
    type:Number,
    required:true
},
owner :
{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
    
}
},
{
    timestamps:true

})
const Task= mongoose.model('Task',taskSchema)
module.exports=Task 