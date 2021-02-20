const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/',  async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user',{username:1, name:1, id:1})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  console.log(user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try{
    const saveBlog = await blog.save()
    user.blogs = user.blogs.concat(saveBlog)
    await user.save().catch(error => next(error))
    console.log(saveBlog)
    response.json(saveBlog)
  }catch(exception){
    response.status(400)
    next(exception)
  }
})


blogsRouter.delete('/:id',  async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)


  if (blog.user.toString() === user.id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    return response.status(401).end()
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const updateInfo = {
    likes: body.likes,
  }

  await Blog.findByIdAndUpdate(request.params.id, updateInfo, { new: true })
    .catch(error => next(error))

  response.status(204).end()

})

module.exports = blogsRouter
