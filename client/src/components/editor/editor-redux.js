import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Select from '../form/select'
import Dropzone from '../form/dropzone'
import Errors from '../errors'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import agent from '../../agent'
import crypto from 'crypto'
import request from 'superagent'

import {
  EDITOR_FORM_LOADED,
  EDITOR_FORM_UNLOADED,
  EDITOR_TAG_ADDED,
  EDITOR_TAG_REMOVED,
  EDITOR_TEXT_FIELD_UPDATE,
  EDITOR_CHECKBOX_SWITCHED,
  EDITOR_POST_SUBMITTED,
  UPLOADER_MEDIA_UPLOADED,
  UPLOADER_MEDIA_PROGRESS,
  UPLOADER_MEDIA_DELETED,
  TOASTIFY,
} from '../../actions'

import {
  CLOUD_UPLOAD,
  CLOUD_PRESET,
  // CLOUD_SECRET,
  CLOUD_DELETE,
} from '../../configs'

const mapStateToProps = state => ({ ...state, ...state.editor })

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: EDITOR_FORM_LOADED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITOR_FORM_UNLOADED, payload }),
  onAddTag: () =>
    dispatch({ type: EDITOR_TAG_ADDED }),
  onRemoveTag: tag =>
    dispatch({ type: EDITOR_TAG_REMOVED, tag }),
  onUpdateField: (key, value) =>
    dispatch({ type: EDITOR_TEXT_FIELD_UPDATE, key, value }),
  onUpdateChecked: (key, value) =>
    dispatch({ type: EDITOR_CHECKBOX_SWITCHED, key, value }),
  onSubmit: payload =>
    dispatch({ type: EDITOR_POST_SUBMITTED, payload }),
  onUpProgress: upload =>
    dispatch({ type: UPLOADER_MEDIA_PROGRESS, upload }),
  onUploaded: uploads =>
    dispatch({ type: UPLOADER_MEDIA_UPLOADED, uploads }),
  onDelete: publicId =>
    dispatch({ type: UPLOADER_MEDIA_DELETED, publicId }),
  showNotice: () =>
    dispatch({ type: TOASTIFY }),
})

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.photoId = 1

    this.state = {
      photoId: 1,
      hover: false,
      upload: [] || null,
      uploads: [] || null,
      error: '',
    }

    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
    const updateCheckEvent = key => ev => this.props.onUpdateChecked(key, ev.target.checked)

    this.changeTitle = updateFieldEvent('title')
    this.changeDescription = updateFieldEvent('description')
    this.changeBody = updateFieldEvent('body')
    this.changeMedium = updateFieldEvent('medium')
    this.changeShareable = updateCheckEvent('shareable')
    this.changeAllowComments = updateCheckEvent('allow_comments')
    this.changePurchasable = updateCheckEvent('purchasable')
    this.changePrice = updateFieldEvent('price')
    this.changeTagInput = updateFieldEvent('tagInput')

    this.random = max => {
      return Math.floor(Math.random() * Math.floor(max))
    }

    this.getTimestamp = () => {
      return this.props.uploads[0].version
    }

    this.setSign = hash => {
      return crypto.createHash('sha1').update(hash, 'utf8').digest('hex')
    }

    this.submitForm = ev => {
      ev.preventDefault()

      const post = {
        uploads: this.props.uploads,
        publicId: this.props.publicId,
        title: `${this.props.medium}_${this.random(999)}`,
        description: this.props.description,
        body: this.props.body,
        medium: this.props.medium,
        shareable: this.props.shareable,
        allow_comments: this.props.allow_comments,
        purchasable: this.props.purchasable,
        price: this.props.price,
        tagList: this.props.tagList
      }

      // const final = this.setSign(
      //   'public_id='
      //   + post.title
      //   + '&timestamp='
      //   + this.getTimestamp(post)
      //   + CLOUD_SECRET)

      // post.signature = final

      const slug = { slug: this.props.slug }

      const promise = this.props.slug
        ? agent.Posts.update(Object.assign(post, slug))
        : agent.Posts.create(post)

      this.props.onSubmit(promise)
    }
  }

  showError = (err, msg) => {
    toast.error(`${err} ${msg}\n`)
  }

  stopEvent = ev => {
    ev.preventDefault()
    ev.stopPropagation()
  }

  onDragEnter = ev => {
    this.stopEvent(ev)
  }

  onDragLeave = ev => {
    this.stopEvent(ev)
    this.setState({ hover: false })
  }

  onDragOver = ev => {
    this.stopEvent(ev)
    this.setState({ hover: true })
  }

  onDrop = ev => {
    this.stopEvent(ev)
    const { files } = ev.dataTransfer
    // this.checkMimeType(ev)
    this.onCloudinary(files)
    this.setState({ hover: false })
  }

  checkMimeType = (ev) => {
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const supported = fileTypes.indexOf(ev.dataTransfer.files[0].type) > -1
    return supported
      ? this.showPreview(ev)
      : toast.error(`${ev.dataTransfer.files[0].type} is not a supported format\n`)
  }

  showPreview = (ev) => {
    const reader = new FileReader()
    reader.readAsDataURL(ev.dataTransfer.files[0] || [])
    return reader.onload = ev => this.setState({ hover: false, uploads: [...this.state.uploads, ev.target.result] })
  }

  onProgress = (id, fileName, progress) => {
    this.props.onUpProgress({ id: id, fileName: fileName, progress: progress })
  }

  onUploaded = (id, fileName, response) => {
    this.props.onUpProgress({ id: id, fileName: fileName, response: response, })
    this.props.onUploaded([response.body])
  }

  onClearAllUploads = () => {
    this.setState({ upload: [] || null });
  }

  onClearUpload = ev => {
    const id = this.state.uploads.findIndex(uploads => uploads === ev.target.src)
    this.setState(state => {
      const uploads = state.uploads.slice(0, id).concat(state.uploads.slice(id + 1, state.uploads.length))
      return { uploads, }
    })
  }

  onCloudinary(files) {
    for (let file of files) {
      const photoId = this.photoId++
      const medium = this.props.medium
      const auth_email = this.props.common.currentUser.email
      const auth_name = this.props.common.currentUser.username
      const name = `${medium}_${this.getRandomInt(999)}`
      request.post(CLOUD_UPLOAD)
        .field('file', file)
        .field('upload_preset', CLOUD_PRESET)
        .field('public_id', `${name}`)
        .field('name', file)
        .field('folder', `${medium}`)
        .field('multiple', true)
        .field('tags', [`${medium}`])
        .field('context', `medium=${medium}|author_email=${auth_email}|author_name=${auth_name}`)
        .on('progress', progress => this.onProgress(photoId, file.name, progress))
        .end((err, response) => this.onUploaded(photoId, name, response))
    }
  }

  deleteUpload = () => {
    request
      .post(CLOUD_DELETE)
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({ token: this.props.uploads[0].delete_token })
      .then(this.onDeleteUpload.bind(this))
  }

  onDeleteUpload() {
    this.props.onDelete(
      this.props.uploads[0].public_id
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload()
        return this.props.onLoad(agent.Posts.get(this.props.match.params.slug))
      }
      this.props.onLoad(null)
    }

    this.watchForEnter = e => {
      if (e.keyCode === 13) {
        e.preventDefault()
        this.props.onAddTag()
      }
    }

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag)
    }

    this.getRandomInt = max => {
      return Math.floor(Math.random() * Math.floor(max))
    }
  }

  UNSAFE_componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Posts.get(this.props.match.params.slug))
    }
    this.props.onLoad(null)
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {

    return (
      <Fragment>

        <Dropzone
          uploads={this.props.uploads}
          onClick={this.deleteUpload}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          hover={this.state.hover}
          onChange={this.onCloudinary}
          loading={this.props.loading}
          info={this.props.info}
          errors={this.state.errors} />

        <ToastContainer />

        <form className='editor-form'>

          <Select
            value={this.props.medium}
            onChange={this.changeMedium}
            placeholder={'choose'}
            info={this.props.info} />

          <Errors errors={this.state.error} />

          <fieldset className='form-group'>
            <input
              className='form-control'
              type='text'
              placeholder="What's this post about?"
              value={this.props.description}
              onChange={this.changeDescription} />
          </fieldset>

          <fieldset className='form-group'>
            <textarea
              className='form-control'
              rows='8'
              placeholder='Write your post (in markdown)'
              value={this.props.body}
              onChange={this.changeBody}>
            </textarea>
          </fieldset>

          <fieldset className='form-group'>
            {'shareable'}
            <input
              id='shareable'
              type='checkbox'
              placeholder='shareable'
              value={this.props.shareable}
              onChange={this.changeShareable} />
          </fieldset>

          <fieldset className='form-group'>
            {'allow_comments'}
            <input
              id='allow_comments'
              type='checkbox'
              placeholder='allow_comments'
              value={this.props.allow_comments}
              onChange={this.changeAllowComments} />
          </fieldset>

          <fieldset className='form-group'>
            {'purchasable'}
            <input
              id='purchasable'
              type='checkbox'
              placeholder='purchasable'
              value={this.props.purchasable}
              onChange={this.changePurchasable} />
          </fieldset>

          {this.props.purchasable ? (
            <fieldset className='form-group'>
              <input
                id='price'
                type='text'
                placeholder='price'
                value={this.props.price}
                onChange={this.changePrice} />
            </fieldset>
          ) : null}

          <fieldset className='form-group'>
            <input
              className='form-control'
              type='text'
              id='tagList'
              placeholder='Enter tags'
              value={this.props.tagInput}
              onChange={this.changeTagInput}
              onKeyUp={this.watchForEnter} />
            <div className='tag-list'>
              {(this.props.tagList || []).map(tag => {
                return (
                  <span className='tag-default tag-pill' key={tag}>
                    <i className='ion-close-round'
                      onClick={this.removeTagHandler(tag)} />
                    {tag}
                  </span>
                )
              })}
            </div>
          </fieldset>

          <button
            className='btn btn-lg pull-xs-right btn-primary'
            type='button'
            disabled={this.props.inProgress}
            onClick={this.submitForm}>
            {'Publish Post'}
          </button>
        </form>

      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
