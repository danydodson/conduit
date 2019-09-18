import React from 'react'
import { Title } from './title-styles'

const AppName = ({ appName }) => {
  return (
    <Title to="/">
      {appName.toLowerCase()}
    </Title>
  )
}

export default AppName