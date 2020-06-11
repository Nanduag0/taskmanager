const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const validator=require('validator')
const userSchema=new mongoose.Schema({
    
    name:
    {
    type: String,
    required:true,
    trim:true
    },
    email:
    {
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    validate(value)
    {
        if(!validator.isEmail(value))
        {
            throw new Error('Email is invalid')
        }
    }
    },
    age:
    {
    type: Number,
    default:0,
    validate(value)
    {
        if(value<0)
        {
            throw new Error('Age must be a +ve number')
        }
    }
    },
    password:
    {
      type:String,
      requires:true,
      minlength:2,
      trim:2,
      validate(value)
      {
          if(value.toLowerCase().includes('password'))
          {
              throw new Error('Password cannot contain "password"') 
          }
    
      }
    },
    tokens: [{
        token:
        {
            type:String,
            required:true

        }
    }],
    avatar:
    {
        type:Buffer
        
    }

    },
    {
        timestamps:true
    }
   
    )
mongoose.connect(process.env.MONGODB_URL,
{
 useNewUrlParser:true,
 useCreateIndex:true

})
//Generate token !!
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
userSchema.methods.generateAuthtoken=async function()
{
const user=this;
const token=jwt.sign({_id: user._id.toString() },process.env.JWT_SECRET)
user.tokens=user.tokens.concat({token})
await user.save()
return token 
}
userSchema.methods.toJSON=function()
{
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject

}







userSchema.statics.findByCredentials= async(email,password)=>
{
    const user=await User.findOne({email})
    if(!user)
    {
        throw new Error('Unale to login')
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error('Enable to login')
    }
    return user
}

//middleware help us to do that hash the plain txt password before saving 



userSchema.pre('save',async function(next){
const user =this
if(user.isModified('password'))
{
    user.password=await bcrypt.hash(user.password,8)
}
//console.log('Just before saving')

next()
})

//Delete all tasks when user is removed
userSchema.pre('remove',async function(next){
    const user=this
    await Task.deleteMany({owner:user_id})
    next()
})


const User=mongoose.model('User',userSchema)
    /*const me=new User({
        name:'   Miki',
        email:'nandiniag@gmail.com',
        password:'45'
    })
    me.save().then(()=>
    {
    console.log(me);
    }).catch((error)=>
    {
    console.log('Error',error)
    })*/
     module.exports=User