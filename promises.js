require('./src/db/mongoose')
const User = require('./src/models/user')

/* User.findByIdAndUpdate('5ecfa1e3004ccc65f0ee28e7',{age: 2}).then((user)=>
{
    console.log(user)
 return User.countDocuments({age : 89})
}).then((result)=>
{
    console.log(result)
}).catch((e)=>
{
    console.log(e);
})

User.findByIdAndDelete('5ecfa1e3004ccc65f0ee28e7',{age: 2}).then((user)=>
{
    console.log(user)
    return User.countDocuments({age:87})

}).then((result)=>
{
    console.log(result)
}).catch((e)=>
{
 console.log(e)
})
*/

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}
updateAgeAndCount('5ecf68d49cbe6033088c515d', 87).then((count) => {
  	console.log(count)
}).catch((e) => {
  	console.log(e)
})

const deleteUserAndCount = async (id, name) => {
	const user = await User.findByIdAndDelete(id, { name })
	const count = await User.countDocuments({ name })
	return count
}
deleteUserAndCount('5ecf73ec543960357cfd9dfa', 'Nandini').then((count) => {
  	console.log(count)
}).catch((e) => {
  	console.log(e)
})

/* const doworkpromise=new Promise((resolve,reject) =>
{
    setTimeout(()=>
    {
     // resolve([7,5,1])
     reject('Things went wrong')
     resolve([2,3,2])
    },2000)

})
doworkpromise.then((result)=>
{
    console.log('Success',result)
}).catch((error)=>
{
console.log('Error!',error)
}) */

/* const add=(a,b)=>
{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>
        {
            resolve(a+b)
        },2000)
    })
}
/*
add(1,2).then((sum)=>{
    console.log(sum)
    add(sum,8).then((sum)=>
    {
        console.log(sum);
    }).catch((e)=>
    {
        console.log(e);
    })
}).catch((e)=>
{
    console.log(e)
})
*/
/*
add(1,2).then((sum)=>
{
    console.log(sum)
    return add(sum,7)
}).then((sum2)=>
{
console.log(sum2)
}).catch((e)=>
{
console.log(e);
})
*/
