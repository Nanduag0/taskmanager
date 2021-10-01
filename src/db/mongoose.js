const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true

  })

/* const Class=mongoose.model('Class',{
    name:{
        type:String
    },
    rollno:
    {
        type:Number
    }
})
const you=new Class({
    name:'Pohana Bajaji',
    rollno:22
})
you.save().then(()=>
{
    console.log(you)
}).catch((error)=>
{
    console .log('Error',error)
})
*/
