import React from 'react'
import { Link } from 'react-router-dom'

const AppName = ({ appName }) => {
  return (
    <Link to="/" className='nav-item'>
      {appName.toLowerCase()}
    </Link>
  )
}

export default AppName