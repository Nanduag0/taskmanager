const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
  // const clas=new classes(req.body)
  const task = new Task({
    ...req.body,
    owner: req.user._id

  })
  try {
    await task.save()
    res.status(200).send(req.body)
  } catch (e) {
    res.status(500).send(e)
  }
})
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const task = await Task.findOne({ _id, owner: req.user._id })
    if (!task) {
      return res.status(400).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})
/* router.get('/tasks',auth,async(req,res) =>
{
    try
    {
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch(e)
    {
  res.status(500).send();
    }
}) */

// GET/tasks?completed=true
// GET /tasks?liit=10&skip=20
// GET/task/sorby=createdAT:desc

router.get('/tasks', auth, async (req, res) => {
  const match = {}
  const sort = {}
  if (req.query.name) {
    match.name = req.query.name === 'lmao'
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = part[1] === 'desc' ? -1 : 1
  }
  try {
    //  const task=await Task.find({owner:req.user._id})
    await req.user.populate({
      path: 'tasks',
      match,
      options:
          {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
          }
    }).execPopulate()

    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send()
  }
})
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'rollno']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' })
  }
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }
    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findAndDelete({
      _id: req.params.id, owner: req.user._id
    })
    if (!task) {
      res.status(404).send()
    }
    // res.send(task)
  } catch (e) {
    res.status(500)
  }
})

module.exports = router
