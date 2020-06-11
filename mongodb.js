/*const mongodb =require('mongodb')
const MongoClient=mongodb.MongoClient*/

const{MongoClient,ObjectId}=require('mongodb')
const connectionurl='mongodb://127.0.0.1:27017'
const databaseName='task-manager'
const id=new ObjectId();
//console.log(id.id);
//console.log(id.getTimestamp);



MongoClient.connect( connectionurl ,{useNewUrlParser:true},{useUnifiedTopology: true},(error,client) =>
    {
        if(error)

        {
            return console.log('Unable to connect to database');

        }
     const db = client.db(databaseName);
     //collections 
     //inserting single documnet to collection
    /* db.collection('users').insertOne(
        {

            _id:id,
            name:'Andrew',
            age:'34'
   
        },(error,result)=>
        {
            if(error)
            return console.log('Unable to insert user')
            console.log(result.ops);//array of documnets 
        }

    );

    db.collection('users').findOne({ _id:new ObjectId("5ebd3213f8c37a520cabca2f")} ,(error,user) =>
    {
        if(error)
        return console.log('Unable to fetch');
        console.log(user);
    }
    );*/
  db.collection('users').updateOne({_id:new ObjectId('5ebd3213f8c37a520cabca2f')},
   {
      $inc:
      {
          age:1
      }
   }).then((result)=>
    {
      console.log(result)
    }).catch((error)=>
    {
     console.log(error)
    })

    db.collection('users').find({name:'Andrew'}).toArray((error,users) =>
    {
        console.log(users);
    });

    db.collection('users').deleteMany({
        age:34
    }).then((result) =>
    {
      console.log(result)

    }).catch((error)=>
    {
     console.log(error);
    })
});

 
  /*db.collection('users').find({name:'Andrew'}).toArray((error,users) =>
    {
        console.log(users);
    });*/


   /* db.collection('users').insertMany
    (
        [
            {
                _id:id,
                name:'Andy',
                age:67
            },
            {
                name:'Murray',
                age:87
            }
        ],(error,result)=>
        {
            if(error)
        {
         return console.log('Unable to insert documents')   
        }
        console.log(result.o ps);
        }
    );*/
   // });

   




