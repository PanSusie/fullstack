import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleLogin,
  handleUsername,
  handlePassword
}) => {

  return (
    <form onSubmit={handleLogin}>
      <div>
      username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={handleUsername}
        />
      </div>
      <div>
      password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={handlePassword}
        />
      </div>
      <button
        type="submit"
        id="login-buttun"
      >login</button>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
}

export default LoginForm
