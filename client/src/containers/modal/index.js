import React, { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { history, store } from '../../middleware/store'

import Article from './Styles'

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

    < Provider store={store} >
      <ConnectedRouter history={history}>
        <Article>
          <button onClick={onButtonClick}>CLOSE</button>
          {children}
        </Article>
      </ConnectedRouter>
    </Provider >
  ), elRef.current)
}

export default Modal
