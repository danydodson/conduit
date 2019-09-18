import React from 'react'
import { Banr } from './banner-styles'

const Banner = ({ appName, token }) => {
  if (token) return null
  return (
    <Banr>
      <h1 className="logo-font">
        {appName.toLowerCase()}
      </h1>
      <p>A place to share your knowledge.</p>
    </Banr>
  )
}

export default Banner
