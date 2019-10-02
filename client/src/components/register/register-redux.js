import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import agent from '../../agent'
import Errors from '../errors'

import { RegWrap } from './register-styles'

import {
  REGISTER_FORM_LOADED,
  AUTH_UPDATE_FIELD,
  AUTH_USER_REGISTER,
  REGISTER_FORM_UNLOADED
} from '../../actions'

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: REGISTER_FORM_LOADED }),
  onChangeEmail: value =>
    dispatch({ type: AUTH_UPDATE_FIELD, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: AUTH_UPDATE_FIELD, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: AUTH_UPDATE_FIELD, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password)
    dispatch({ type: AUTH_USER_REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_FORM_UNLOADED })
})

class Register extends React.Component {
  constructor() {
    super()
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value)
    this.changePassword = ev => this.props.onChangePassword(ev.target.value)
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value)
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault()
      this.props.onSubmit(username, email, password)
    }
  }

  UNSAFE_componentWillMount() {
    this.props.onLoad()
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    const email = this.props.email
    const password = this.props.password
    const username = this.props.username
    return (
      <RegWrap>
        <h1>{'Sign Up'}</h1>
        <Link to="/login">{'Have an account?'}</Link>

        <Errors errors={this.props.errors} />

        <form onSubmit={this.submitForm(username, email, password)}>
          <fieldset>

            <fieldset>
              <input
                className=''
                type="text"
                placeholder="Username"
                value={this.props.username}
                onChange={this.changeUsername} />
            </fieldset>

            <fieldset>
              <input
                className=''
                type="email"
                placeholder="Email"
                value={this.props.email}
                onChange={this.changeEmail} />
            </fieldset>

            <fieldset>
              <input
                className=''
                type="password"
                placeholder="Password"
                value={this.props.password}
                onChange={this.changePassword} />
            </fieldset>

            <button
              className=''
              type="submit"
              disabled={this.props.inProgress}>
              {'Sign up'}
            </button>

          </fieldset>
        </form>
      </RegWrap>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
