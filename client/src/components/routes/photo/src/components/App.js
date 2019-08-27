import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CloudinaryContext } from 'cloudinary-react'
import { photosFetched } from '../actions'
import PhotoListContainer from './PhotoList'
import PhotosUploaderContainer from './PhotosUploader'
import { fetchPhotos } from '../utils/CloudinaryService'
import './App.css'

class App extends Component {

  componentDidMount() {
    fetchPhotos(this.props.cloudName).then(this.props.onPhotosFetched)
  }

  render() {
    return (
      <CloudinaryContext
        cloudName={this.props.cloudName}
        uploadPreset={this.props.uploadPreset}>
        <BrowserRouter>
          <Switch className="router">
            <Route exact path="/photos" component={PhotoListContainer} />
            <Route exact path="/photos/new" component={PhotosUploaderContainer} />
            <Redirect from="/" to="/photos" />
          </Switch>
        </BrowserRouter>
      </CloudinaryContext>
    )
  }
}

App.propTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string,
  onPhotosFetched: PropTypes.func,
}

App.contextTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string,
}

const AppContainer = connect(null, { onPhotosFetched: photosFetched })(App)

Object.assign(AppContainer.contextTypes, App.contextTypes)

export default AppContainer
