import React from 'react'
import { Link } from 'react-router-dom'

const AppName = ({ appName }) => {
  return (
    <Link to="/" className="navbar-brand">
      {appName.toLowerCase()}
    </Link>
  )
}

export default AppName