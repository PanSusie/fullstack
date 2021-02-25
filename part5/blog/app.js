const jwt = require('jsonwebtoken')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')


mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


app.use(middleware.tokenExtractor)

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)


if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/reset')

  app.use('/api/testing', testingRouter)
  console.log(testingRouter)
}


app.use(middleware.errorHandler)

module.exports = app
