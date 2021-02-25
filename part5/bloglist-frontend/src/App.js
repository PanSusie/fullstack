import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import LoginForm from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlogForm = () => {
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setVisible(true)}> new note </button>
        </div>
        <div style={showWhenVisible}>
          <AddBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
            title={title}
            url={url}
            author={author}
            setNotification={setNotification}
          />
          <button onClick={() => setVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }



  const blogForm = () => {

    const blogSort = blogs.sort((a, b) =>
      parseFloat(b.likes) - parseFloat(a.likes)
    )

    return(
      <div>
        {user.username} logged in
        <form onSubmit={handleLogout}>
          <button type="submit">logout</button>
        </form>
        {addBlogForm()}
        {blogSort.map(blog =>
          <Blog key={blog.id} blog={blog} user={user}/>
        )}

      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage === null?
        null :
        <p className="error">{errorMessage}</p>
      }
      {notification === null?
        null :
        <p className="note">{notification}</p>
      }
      {user === null?
        <LoginForm  username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
        /> :
        blogForm()
      }
    </div>
  )
}

export default App
