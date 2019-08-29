import React from 'react'
import { connect } from 'react-redux'
import agent from '../../../agent'
import { PHOTOS_SUBMITTED, UPLOADER_PAGE_UNLOADED } from '../../../constants/types'

const mapStateToProps = state => ({ ...state.editor })

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: PHOTOS_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: UPLOADER_PAGE_UNLOADED, payload }),
})

class ForMongo extends React.Component {
  constructor(props) {
    super(props)

    this.submitForm = e => {
      e.preventDefault()
      const photo = {
        public_id: this.props.uploadedPhoto.response.body.public_id,
        version: this.props.uploadedPhoto.response.body.version,
        format: this.props.uploadedPhoto.response.body.format,
        width: this.props.uploadedPhoto.response.body.width,
        height: this.props.uploadedPhoto.response.body.height,
        type: this.props.uploadedPhoto.response.body.type,
        created_at: this.props.uploadedPhoto.response.body.created_at,
        context: this.props.uploadedPhoto.response.body.context,
        url: this.props.uploadedPhoto.response.body.url,
        secure_url: this.props.uploadedPhoto.response.body.secure_url,
        delete_token: this.props.uploadedPhoto.response.body.delete_token,
      }

      const slug = { slug: this.props.photoSlug }

      const promise = this.props.photoSlug
        ? agent.Photos.update(Object.assign(photo, slug))
        : agent.Photos.create(photo)

      console.log(photo)

      this.props.onSubmit(promise)
    }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (this.props.match.params.slug !== nextProps.match.params.slug) {
  //     if (nextProps.match.params.slug) {
  //       this.props.onUnload()
  //       return this.props.onLoad(agent.Post.get(this.props.match.params.slug))
  //     }
  //     this.props.onLoad(null)
  //   }
  // }

  // UNSAFE_componentWillMount() {
  //   if (props.match.params.slug) {
  //     return this.props.onLoad(agent.Post.get(this.props.match.params.slug))
  //   }
  //   this.props.onLoad(null)
  // }

  // componentWillUnmount() {
  //   this.props.onUnload()
  // }

  render() {

    const uploadedPhoto = this.props.uploadedPhoto
    const response = uploadedPhoto.response
    const data = response && response.body

    return (
      <form>
        <label htmlFor="public_id">
          <input placeholder={data && (data.public_id)} id="public_id" value={data && (data.public_id)} />
        </label>
        <label htmlFor="url">
          <input placeholder={data && (data.url)} id="url" value={data && (data.url)} />
        </label>
        <label htmlFor="secure_url">
          <input placeholder={data && (data.secure_url)} id="secure_url" value={data && (data.secure_url)} />
        </label>
        <label htmlFor="delete_token">
          <input placeholder={data && (data.delete_token)} id="delete_token" value={data && (data.delete_token)} />
        </label>
        <button onClick={this.submitForm.bind(this)}>Publish Article</button>
      </form>
    )
  }
}

ForMongo = connect(mapStateToProps, mapDispatchToProps)(ForMongo)

export default ForMongo