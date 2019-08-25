import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { FiX } from 'react-icons/fi'
import styled from 'styled-components'
import store from '../../store'


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  display: block;
  z-index: 1000;
`

const BackIcon = styled.button`
  top: 1rem;
  left: 1rem;
  width: 3rem;
  height: 3rem;
  margin: 1rem;
  color: rgba(0, 0, 0, .9);
  font-size: 1.4rem;
  border-radius: 4px;
  position: absolute;
  background-color: rgba(250, 250, 250, .5);
  &:hover {
    color: rgb(240, 61, 61);
    background-color: rgba(250, 250, 250, .9);
  }
`

const Content = styled.div`
  top: 10px;
  left: 70px;
  right: 70px;
  bottom: 10px;
  overflow: auto;
  position: fixed;
  border: 1px solid #2c2c2c;
  background-color: #ffffff;
  outline: none;
  display: block;
`

class Modal extends Component {

  componentDidMount() {
    this.modalTarget = document.createElement('div')
    this.modalTarget.className = 'modal'
    document.body.appendChild(this.modalTarget)
    document.body.classList.add('freeze')
    this._render()
  }

  componentWillUpdate() {
    this._render()
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget)
    document.body.removeChild(this.modalTarget)
    document.body.classList.remove('freeze')
  }

  _render() {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <Overlay>
            <BackIcon onClick={this.props.goBack}>
              <FiX />
            </BackIcon>
            <Content>
              {this.props.children}
            </Content>
          </Overlay>
        </BrowserRouter>
      </Provider>,
      this.modalTarget
    )
  }

  render() {

    //console.log(this.props.children)

    return <noscript />
  }
}

export default Modal