const name ="Andrew"
const userAge=27
const user=
{
     name,
    age:userAge,
    location:'Philadelphia'


}
console.log(user);

//object destructuring 
const product=
{
    label:'Red notebook',
    price:3,
    stock:202,
    salesPrice:undefined
}

const{label:productlabel,stock,rating}=product
console.log(productlabel)
console.log(stock)
console.log(rating)