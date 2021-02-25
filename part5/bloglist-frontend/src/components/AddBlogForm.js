import React from 'react'
import blogService from '../services/blogs'

const AddBlogForm = ({
  blogObject,
  setBlogs,
  setNotification,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  blogs,
  title,
  url,
  author
}) => {

  const addBlog = (event) => {
    event.preventDefault()
    blogObject = {
      title: title,
      author: author,
      url: url
    }

    console.log(blogObject)

    blogService
      .create(blogObject)
      .then(returnBlog => {
        setBlogs(blogs.concat(returnBlog))
      })

    setNotification(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setNotification(null)
    },5000)
  }


  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
      title:
          <input
            value={title}
            onChange={handleTitleChange}
            className="title"
          />
        </div>
        <div>
      author:
          <input
            value={author}
            onChange={handleAuthorChange}
            className="author"
          />
        </div>
        <div>
    url:
          <input
            value={url}
            onChange={handleUrlChange}
            className="url"
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AddBlogForm
