import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, addLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  addLike = (event) => {
    event.preventDefault()

    const blogObject = {
      likes: blog.likes++,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService
      .update(blogObject, blog.id)
      .then(() => {
        setLikes(blog.likes)
      })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      blogService
        .remove(blog.id)
    }
  }


  return (
    <div style={blogStyle}>
      {blog.title}  {blog.author}
      <button style={hideWhenVisible} onClick={() => setVisible(true)}>view</button>
      <button style={showWhenVisible} onClick={() => setVisible(false)}>hide</button>

      <div style={showWhenVisible} className='invisibleContent'>
        <div>{blog.url}</div>
        <div>
        likes {likes}
          <form onSubmit={addLike}>
            <button type='submit' className='likeButton'>like</button>
          </form>
        </div>
        <div>{blog.user.username}</div>

        {blog.user.username === user.username ?
          <form onSubmit={removeBlog}>
            <button type='submit'>remove</button>
          </form> :
          ''
        }

      </div>
    </div>
  )}

export default Blog
