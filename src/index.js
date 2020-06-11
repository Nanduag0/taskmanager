const express=require('express')
const multer=require('multer')
const app=express()
//const sharp=require('sharp')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('./db/mongoose')
const Users=require('./models/user')
const Task=require('./models/task')
const auth=require('./middleware/auth')
const userRouter=require('./router/user')
const taskrouter=require('./router/task')
const port=process.env.PORT || 8080

//User won't have task !!!
//Find task on basis of user 
const main=async()=>
{
    const user=await Users.findById('5ed35403197d2e05388daf15')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)

}
main()

const upload=multer
({
 //dest:'images',
 limits:
 {
     fileSize:1000000
 },
 fileFilter(req,file,cb)
 {
     if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
     {
         return cb(new Error('Please upload an image'))
     }
     cb(undefined,true)
 }

 /*fileFilter(req,file,cb)
 {
     if(!file.originalname.endsWith('.pdf'))
     {
  return cb(new Error('please upload a pdf'))
     }
     cb(undefined,true)
     */
    // cb(new Error('ile must not be a pdf'))
     //cb(undefined,true)
     //cb(undefined,false)
 //}
})
/*const errormiddleware =(req,res,next)=>
{
    throw new Error('From my middleware')
}*/
app.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>
{
    req.user.avatar=req.file.buffer
   //const buffer=await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
   //req.user.avatar=buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>
{
   res.status(400).send({error: error.message})
})
/*
const upload=multer({
    dest:'avatar'
})

userRouter.post('/users/me/avatar',upload.single('avatar'),(req,res)=>
{
res.send()
},(error,req,res,next)=>
{
res.status(400).send({
    error: error.message
});
})
*/



/*const main=async()=>
{
    //find user from the task !!!!
     //const task=await Task.findById('5ed3741fcd629e42602e04fa')
    //await task.populate('owner').execPopulate()
    //console.log(task.owner)
   //console.log(task)
  // const user=await Userss.findById('5ed35eaca3b41d6bcc4db9c6')

}
main()
*/
/*const router=new express.router(
router.get('/test',(req,res)=>
{
  res.send('This is from my other router')
}),
*/
/*
app.use((req,res,next)=>
{
if(req.method=='GET')
{
res.send('GET requests are disabled')
}
else
next()
})
*/
/*
app.use((req,resnext)=>
{
    res.status(500).send('Sure is currently down.Check back soon')
})
*/

userRouter.delete('/users/me/avatar',auth,async(req,res)=>
{
    req.user.avatar=undefined
    await req.user.save();
    res.send();

})

userRouter.get('/users/:id/avatar',async(req,res)=>
{
    try 
    {
        const user=await Users.findById(req.params.id)
        if(!user || !user.avatar)
        {
           throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }
    catch(e)
    {
        res.status(400).send()
    }
})
app.use(express.json())

app.use(userRouter)
app.use(taskrouter)
/*
app.post('/class',(req,res) =>
{
    const classes = new Class(req.body)
    console.log(classes)
    classes.save().then(()=>
    {
        res.send(classes);
    }).catch((e)=>
    {
        res.status(400).send
        res.send(e);
    })
})
*/
app.listen(port,()=>
{
        console.log('Server is up on port'+process.env.PORT)
})
/*const mufunction=async()=>
{
    const password='12345!'
    const hashPassword=await bcrypt.hash(password,8)
    console.log(password)
    console.log(hashPassword)

    const ismatch=await bcrypt.compare(password,hashPassword)
    console.log(ismatch)
}
mufunction()*/


//andrew-> encryption->series of character
//andrew->hashing ->series of charactrs which cannot be revered

const myfunction =async()=>
{
   const token= jwt.sign({_id:'8765'},'this is my new course',{expiresIn:'7 days'})
   console.log(token)
   const data=jwt.verify(token,'this is my new course')
   console.log(data)

}
myfunction()