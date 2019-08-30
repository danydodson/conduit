import React, { useEffect, useRef } from "react"
import { ConnectedRouter } from 'connected-react-router'
import { createPortal } from "react-dom"
import { Provider } from 'react-redux'
import { history, store } from '../../store'

const modalRoot = document.getElementById("modal")

const Modal = ({ children }) => {

  const elRef = useRef(null)

  if (!elRef.current) {
    elRef.current = document.createElement('div')
  }

  const onButtonClick = () => {
    modalRoot.removeChild(elRef.current)
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current)
    return () => modalRoot.removeChild(elRef.current)
  }, [])

  return createPortal((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Post>
          <button onClick={onButtonClick}>CLOSE</button>
          {children}
        </Post>
      </ConnectedRouter>
    </Provider>
  ), elRef.current)
}

export default Modal
