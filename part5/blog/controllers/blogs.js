const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/',  async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user',{username:1, name:1, id:1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  if (!blog.url || !blog.title) {
    return response.status(400).send({
      error: "title or url missing"
    })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  blog.user = user

  const saveBlog = await blog.save()
  user.blogs = user.blogs.concat(saveBlog)
  await user.save()
  response.status(201).json(saveBlog)
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
    return response.status(401).json({ error: 'only the creator can delete blogs' })
  }
})


blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const updateInfo = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updateInfo.toJSON())
})

module.exports = blogsRouter
