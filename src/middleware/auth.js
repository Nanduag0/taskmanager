const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Task = require('../models/task')

/* userSchema.pre('save',async function(next){
    const user=this
    await Task.deleteMany({
        owner:user._id
    })
    if(user.isModified('password'))
    {
        user.password=await bycrpt.hash(user.password,0)

    }
    next();
})
*/

// Hashes the password before it is saved

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) {
      throw new Error()
    }
    req.token = token
    req.user = user
    next()

    console.log(token)
  } catch (e) {
    res.status(400).send({ error: 'Pleasr authenticate.' })
  }
}
module.exports = auth
