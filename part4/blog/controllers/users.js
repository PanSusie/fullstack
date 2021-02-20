const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs', {url:1, title:1, author:1, id:1})
  console.log('get')

  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  const body = new User(request.body)

  const saltRounds = 10
  let passwordHash = body.password
  if (passwordHash.length >= 3) {
    passwordHash = await bcrypt.hash(body.password, saltRounds)
  }


  const user = new User({
    username: body.username,
    name: body.name,
    password: passwordHash
  })

  const savedUser = await user.save().catch(error => next(error))

  response.json(savedUser)
})

module.exports = usersRouter
