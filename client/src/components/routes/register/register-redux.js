import { Link } from 'react-router-dom'
import Errors from '../../errors'
import React from 'react'
import agent from '../../../actions/actions-agent'
import { connect } from 'react-redux'

import {
  REGISTER_FORM_LOADED,
  AUTH_USER_REGISTER,
  AUTH_UPDATE_FIELD,
  REGISTER_FORM_UNLOADED
} from '../../../actions/actions-types'

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
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <Errors errors={this.props.errors} />

              <form onSubmit={this.submitForm(username, email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={this.props.username}
                      onChange={this.changeUsername} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.props.email}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={this.props.password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign up
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
