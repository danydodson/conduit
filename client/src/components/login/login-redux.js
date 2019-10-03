import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Input from '../form/input'

import agent from '../../agent'

import {
  LOGIN_FORM_LOADED,
  AUTH_USER_LOGIN,
  AUTH_UPDATE_FIELD,
  LOGIN_FORM_UNLOADED
} from '../../actions'

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: LOGIN_FORM_LOADED }),
  onChangeEmail: value =>
    dispatch({ type: AUTH_UPDATE_FIELD, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: AUTH_UPDATE_FIELD, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: AUTH_USER_LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_FORM_UNLOADED }),
})

class Login extends React.Component {
  constructor() {
    super()

    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value)
    this.changePassword = ev => this.props.onChangePassword(ev.target.value)

    this.submitForm = (email, password) => ev => {
      ev.preventDefault()
      this.props.onSubmit(email, password)
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

    return (
      <div style={{ paddingTop: 80 }}>

        <h1>Sign In</h1>

        <Link to="/register">Need an account?</Link>

        <form onSubmit={this.submitForm(email, password)}>
          <Input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={this.changeEmail} />
          <Input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={this.changePassword} />
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            disabled={this.props.inProgress}
            type="submit">
            {'Sign in'}
          </button>

        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
