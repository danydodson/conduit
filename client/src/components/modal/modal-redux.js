import React from "react"
import { connect } from 'react-redux'
import Modal from "."

import {
  MODAL_ITEM_LOADED,
  MODAL_ITEM_UNLOADED,
  MODAL_ITEM_REDIRECT
} from '../../agent'

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
    dispatch({ type: MODAL_ITEM_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: MODAL_ITEM_UNLOADED }),
  onRedirect: () =>
    dispatch({ type: MODAL_ITEM_REDIRECT })
})

class Details extends React.Component {

  state = { loading: true, showModal: false }

  componentDidMount() { }

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