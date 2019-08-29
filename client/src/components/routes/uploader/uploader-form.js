import React from 'react'
import { connect } from 'react-redux'
import Errors from '../../errors'
import agent from '../../../agent'

import {
  PHOTOS_SUBMITTED,
  UPLOAD_PREVIEW_LOADED,
  UPLOADER_FORM_UNLOADED,
  UPDATE_FIELD_EDITOR,
  UPDATE_CHECKED_EDITOR
} from '../../../constants/types'

const mapStateToProps = state => ({ ...state.editor })

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: UPLOAD_PREVIEW_LOADED, payload }),
  onSubmit: payload =>
    dispatch({ type: PHOTOS_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: UPLOADER_FORM_UNLOADED, payload }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
  onUpdateChecked: (key, value) =>
    dispatch({ type: UPDATE_CHECKED_EDITOR, key, value })
})



class UploadForm extends React.Component {
  constructor(props) {
    super(props)

    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
    const updateCheckEvent = key => ev => this.props.onUpdateChecked(key, ev.target.checked)

    this.changeTitle = updateFieldEvent('title')
    this.changeDescription = updateFieldEvent('description')
    this.changeMediums = updateFieldEvent('mediums')
    this.changeCategory = updateFieldEvent('category')
    this.changePrice = updateFieldEvent('price')
    this.changeShareable = updateCheckEvent('shareable')
    this.changeAllowComments = updateCheckEvent('allow_comments')
    this.changePurchasable = updateCheckEvent('purchasable')

    this.submitForm = e => {
      e.preventDefault()

      const photo = {
        title: this.props.title,
        description: this.props.description,
        mediums: this.props.mediums,
        category: this.props.category,
        shareable: this.props.shareable,
        allow_comments: this.props.allow_comments,
        purchasable: this.props.purchasable,
        price: this.props.price,
        public_id: this.props.uploadedPhoto.response.body.public_id,
        version: this.props.uploadedPhoto.response.body.version,
        format: this.props.uploadedPhoto.response.body.format,
        width: this.props.uploadedPhoto.response.body.width,
        height: this.props.uploadedPhoto.response.body.height,
        type: this.props.uploadedPhoto.response.body.type,
        bytes: this.props.uploadedPhoto.response.body.bytes,
        created_at: this.props.uploadedPhoto.response.body.created_at,
        tags: this.props.uploadedPhoto.response.body.tags,
        context: this.props.uploadedPhoto.response.body.context,
        access_mode: this.props.uploadedPhoto.response.body.access_mode,
        etag: this.props.uploadedPhoto.response.body.etag,
        url: this.props.uploadedPhoto.response.body.url,
        secure_url: this.props.uploadedPhoto.response.body.secure_url,
        existing: this.props.uploadedPhoto.response.body.existing,
        colors: this.props.uploadedPhoto.response.body.colors,
        predominant: this.props.uploadedPhoto.response.body.predominant,
        phash: this.props.uploadedPhoto.response.body.phash,
        original_filename: this.props.uploadedPhoto.response.body.original_filename,
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

  UNSAFE_componentWillMount() {
    this.props.onLoad()
  }
  
  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {

    const response = this.props.uploadedPhoto.response
    const data = response && response.body

    return (
      <React.Fragment>

        <Errors errors={this.props.errors}></Errors>
        <form>

          <fieldset className="form-group">

            <fieldset className="form-group">
              <label htmlFor="title">
                <input
                  id="title"
                  type="text"
                  placeholder='title'
                  value={this.props.title}
                  onChange={this.changeTitle} />
              </label>
            </fieldset>

            <fieldset className="form-group">
              <label htmlFor="description">
                <input
                  id="description"
                  type="text"
                  placeholder='description'
                  value={this.props.description}
                  onChange={this.changeDescription} />
              </label>
            </fieldset>

            <fieldset className="form-group">
              <label htmlFor="mediums">
                <input
                  id="mediums"
                  type="text"
                  placeholder='mediums'
                  value={this.props.mediums}
                  onChange={this.changeMediums} />
              </label>
            </fieldset>

            <fieldset className="form-group">
              <label htmlFor="category">
                <select
                  id="category"
                  value={this.props.category}
                  onChange={this.changeCategory}
                  onBlur={this.changeCategory}>
                  <option value="category_00">category_00</option>
                  <option value="category_01">category_01</option>
                  <option value="category_02">category_02</option>
                  <option value="category_03">category_03</option>
                </select>
              </label>
            </fieldset>

            <fieldset className="form-group">
              <label htmlFor="shareable">
                <input
                  id="shareable"
                  type="checkbox"
                  placeholder='shareable'
                  value={this.props.shareable}
                  onChange={this.changeShareable} />
              </label>
            </fieldset>

            <fieldset className="form-group">
              <label htmlFor="allow_comments">
                <input
                  id="allow_comments"
                  type="checkbox"
                  placeholder='allow_comments'
                  value={this.props.allow_comments}
                  onChange={this.changeAllowComments} />
              </label>
            </fieldset>

            <fieldset className="form-group">
              <label htmlFor="purchasable">
                <input
                  id="purchasable"
                  type="checkbox"
                  placeholder='purchasable'
                  value={this.props.purchasable}
                  onChange={this.changePurchasable} />
              </label>
            </fieldset>

            <fieldset className="form-group">
              <label htmlFor="price">
                <input
                  id="price"
                  type="text"
                  placeholder='price'
                  value={this.props.price}
                  onChange={this.changePrice} />
              </label>
            </fieldset>


            <label htmlFor="public_id">
              <input placeholder={data && (data.public_id)} id="public_id" value={data && (data.public_id)} />
            </label>
            <label htmlFor="version">
              <input placeholder={data && (data.version)} id="version" value={data && (data.version)} />
            </label>
            <label htmlFor="format">
              <input placeholder={data && (data.format)} id="format" value={data && (data.format)} />
            </label>
            <label htmlFor="width">
              <input placeholder={data && (data.width)} id="width" value={data && (data.width)} />
            </label>
            <label htmlFor="height">
              <input placeholder={data && (data.height)} id="height" value={data && (data.height)} />
            </label>
            <label htmlFor="type">
              <input placeholder={data && (data.type)} id="type" value={data && (data.type)} />
            </label>
            <label htmlFor="bytes">
              <input placeholder={data && (data.bytes)} id="bytes" value={data && (data.bytes)} />
            </label>
            <label htmlFor="created_at">
              <input placeholder={data && (data.created_at)} id="created_at" value={data && (data.created_at)} />
            </label>
            <label htmlFor="tags">
              <input placeholder={data && (data.tags)} id="tags" value={data && (data.tags)} />
            </label>
            {/* {data && (Object.keys(data.context.custom).map(key => {
              return (
                <label htmlFor="context" key={key}>
                  <input  value={key} placeholder={key} />
                  <input  value={JSON.stringify(data[key])} placeholder={JSON.stringify(data[key])} />
                </label>
              )
            }))} */}
            <label htmlFor="url">
              <input disabled="disabled" placeholder={data && (data.url)} id="url" value={data && (data.url)} />
            </label>
            <label htmlFor="secure_url">
              <input placeholder={data && (data.secure_url)} id="secure_url" value={data && (data.secure_url)} />
            </label>
            <label htmlFor="etag">
              <input placeholder={data && (data.etag)} id="etag" value={data && (data.etag)} />
            </label>
            <label htmlFor="existing">
              <input placeholder={data && (data.existing)} id="existing" value={data && (data.existing)} />
            </label>
            <label htmlFor="colors">
              <input placeholder={data && (data.colors)} id="colors" value={data && (data.colors)} />
            </label>
            <label htmlFor="predominant">
              <input placeholder={data && (data.predominant)} id="predominant" value={data && (data.predominant)} />
            </label>
            <label htmlFor="phash">
              <input placeholder={data && (data.phash)} id="phash" value={data && (data.phash)} />
            </label>
            <label htmlFor="original_filename">
              <input placeholder={data && (data.original_filename)} id="original_filename" value={data && (data.original_filename)} />
            </label>
            <label htmlFor="delete_token">
              <input placeholder={data && (data.delete_token)} id="delete_token" value={data && (data.delete_token)} />
            </label>

            <button
              type="button"
              disabled={this.props.inProgress}
              onClick={this.submitForm}>
              Submit
            </button>

          </fieldset>
        </form>
      </React.Fragment>
    )
  }
}

UploadForm = connect(mapStateToProps, mapDispatchToProps)(UploadForm)

export default UploadForm



