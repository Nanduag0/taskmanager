const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')
const {sendwelcomeemail}=require('../emails/account')
const {sendCancellationEmail}=require('../emails/account')
const router=new express.Router();

/*const router= new express.Router()
router.get('/test',(req,res)=>
{
    res.send('This is a new file')
})*/


/*router.post('/users',(req,res)=>
{
    const user=new Users(req.body)
    console.log(user)
    user.save().then(()=>
    {
      res.send(user);
    }).catch((e)=>
    {
        res.status(400).send
        res.send(e);

    })
  //   console.log(req.body);
res.send('posting')
})
*/
router.post('/users',async(req,res)=>
{
    const user=new User(req.body)
    try{
        console.log(user)
        await user.save()
        sendwelcomeemail(user.email,user.name)
        res.status(201).send(user)

    }catch(e)
    {
        res.status(400).send(e)
    }
})
/*app.get('/users',(req,res)=>
{
    Users.find({}).then((users)=>
    {
        console.log(users)
        res.send(users)
    
    }).catch((e)=>
    {

    })
})*/
/*app.get('/users/:id',async(req,res)=>
{
    const  _id=req.params.id
    Users.findById(_id).then((users)=>
    {
        if(!users)
        {
            return res.status(404).send()
        }
        res.send(users)

    }).catch((e)=>
    {
     res.status(500).send()
    })
})
*/
router.post('/users/logout',auth,async (req,res)=>
{
    try{
        req.user.tokens=req.user.tokens.filter((token) =>
        {
           return token.token !==req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e)
    {
   res.status(500).send()
    }
    
})
router.post('/users/logoutAll',auth,async (req,res)=>
{
    try
    {
        req.user.token=[]
        await req.user.save()
        res.send()
    }
    catch(e)
    {
      res.status(500).send()
    }

})
router.post('/users/login',async(req,res)=>
{
    //it requirs email password 

    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthtoken()
        res.send({user: user,token})
    }
    catch(e)
    {
    res.status(400).send()
    }
})
router.get('/users/:id',async(req,res)=>
{
    const _id=req.params._id
    try{
        const user=await User.findById(_id)
        if(!user)
        {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e)
    {
        res.send(500).send()
    }
})
router.get('/users',auth, async(req,res)=>
{
    //const users=await User.find({})
   try
    {
        const users=await User.find({})
        res.send(users)
    }
    catch(e)
    {
        res.status(500).send()
    }
    
    
    //send data of only te  current user
   //  res.send(req.user)
   
})
router.delete('/users/me',auth,async(req,res)=>
{
  try{
  const user=await User.findByIdAndDelete(req.user._id)
 /* if(!user)
  {
      return  res.status(404).send()
  }*/
  sendCancellationEmail(req.user.email,req.user.name)

  res.send(user)
    }
    catch(e)
    {
      res.status(500).send()
    }
})

router.patch('/users/me',auth,async (req,res)=>
{
    const updates=Object.keys(req.body)
    const allowupdates=['name','email','password','age']
    const isValidOperation=updates.every((update)=>
         allowupdates.includes(update))
    if(!isValidOperation)
    {
        return res.status(400).send('error : Invalid update')
    }
    try
    {
      //  const user=await User.findById(req.params.id)

        updates.forEach((update)=>
        {
            req.user[update]=req.body[update]})
            await req.user.save()
    //const user=await Users.findByIdAndUpdate(req.params.id,req.body,{new : true,runValidators: true})
  /*  if(!user)
    {
        return res.status(404).send()
    }*/

    res.send(req.user)
    }
    catch(e)
    {
     res.status(400).send()
    }
})
module.exports=router