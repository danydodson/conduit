import React from "react"
import { connect } from 'react-redux'
import Modal from "./"

import {
  MODAL_PAGE_LOADED,
  MODAL_PAGE_UNLOADED,
  MODAL_PAGE_REDIRECTED
} from '../../actions/types'

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: MODAL_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: MODAL_PAGE_UNLOADED }),
  onRedirect: () =>
    dispatch({ type: MODAL_PAGE_REDIRECTED })
})

class Details extends React.Component {

  state = { loading: true, showModal: false }

  componentDidMount() { 

  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal })

  render() {
    if (this.state.loading) {
      return <h1>loading … </h1>
    }

    const { showModal } = this.state

    return (
      <div>
        <div>
          <h1>Details</h1>
          {showModal ? (
            <Modal>
              <h1>Modal</h1>
              <div className="buttons">
                <button onClick={this.toggleModal}>No</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)