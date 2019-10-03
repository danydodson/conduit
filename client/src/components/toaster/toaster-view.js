import React from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastViewer = ({ type, message, }) => {

  const getType = (type, message) => {
    type === 'error'
      ? toast.error(message)
      : toast.info(message)
  }

  return (
    <div>
      {getType(type, message)}
    </div>
  )
}

export default ToastViewer