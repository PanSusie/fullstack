import '../index.css'
import React from 'react'

const Notification = ({ error, notification }) => {
  if (error === null && notification === null) {
    return null
  } else if (error !== null && notification === null) {
    return (
      <div className="error">
        {error}
      </div>
    )
  } else if (error === null && notification !== null) {
    return (
      <div className="note">
        {notification}
      </div>
    )
  }
}

export default Notification
