const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialData = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialData) {
    let blogObject = new Blog(blog)

    await blogObject.save()
  }
})


test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialData.length)
})


afterAll (() => {
  mongoose.connection.close()
})


test('the unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(blog => blog.id)

  response.body.map(blog => expect(blog.id).toBeDefined())
})


test('a valid blog can be added', async () => {
  const login = {
    username: "test",
    password: "ask"
  }

  const userResponse = await api
  .post('/api/login')
  .send(login)

  console.log(userResponse.body)

  const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 0,
      user: ""
  }

  await api
  .post('/api/blogs')
  .send(newBlog)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialData.length+1)
})


test('missing like property equals to 0', async () => {
  const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  }

  await api
  .post('/api/blogs')
  .send(newBlog)

  const response = await api.get('/api/blogs')

  const likes = response.body.map(blog => blog.likes )

  expect(likes[initialData.length]).toBe(0)
})



test('return 400 if title and url are missing', async () => {
  const newBlog = {
      author: "Edsger W. Dijkstra",
  }

  const response = await api
  .post('/api/blogs')
  .send(newBlog)

  const status = response.status

  expect(status).toBe(400)

})
