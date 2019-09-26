import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import SelectBox from '../selectbox'
import Dropzone from '../dropzone'
import Errors from '../errors'
import mediums from './mediums'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import agent from '../../middleware/middle-agent'
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
  UPLOADER_MEDIA_PROGRESS,
  UPLOADER_MEDIA_UPLOADED,
  UPLOADER_MEDIA_DELETED,
} from '../../constants'

import {
  CLOUD_UPLOAD,
  CLOUD_PRESET,
  CLOUD_SECRET,
  CLOUD_DELETE,
} from '../../configs/cloud-configs'

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

  onUploading: upload =>
    dispatch({ type: UPLOADER_MEDIA_PROGRESS, upload }),

  onUploaded: uploaded =>
    dispatch({ type: UPLOADER_MEDIA_UPLOADED, uploaded }),

  onDelete: pubId =>
    dispatch({ type: UPLOADER_MEDIA_DELETED, pubId }),
})

class Editor extends React.Component {
  constructor() {
    super()

    this.state = {
      upload: null,
      uploads: null,
      hover: false,
      errors: false,
    }

    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
    const updateCheckEvent = key => ev => this.props.onUpdateChecked(key, ev.target.checked)
    // const updateFileEvent = key => ev => this.props.onUpdateFileEvent(key, ev.target.checked)

    this.changeTitle = updateFieldEvent('title')
    this.changeDescription = updateFieldEvent('description')
    this.changeBody = updateFieldEvent('body')
    this.changeMedium = updateFieldEvent('medium')
    this.changeShareable = updateCheckEvent('shareable')
    this.changeAllowComments = updateCheckEvent('allow_comments')
    this.changePurchasable = updateCheckEvent('purchasable')
    this.changePrice = updateFieldEvent('price')
    this.changeTagInput = updateFieldEvent('tagInput')

    this.watchForEnter = e => {
      if (e.keyCode === 13) {
        e.preventDefault()
        this.props.onAddTag()
      }
    }

    this.random = max => {
      return Math.floor(Math.random() * Math.floor(max))
    }

    this.getTimestamp = () => {
      return this.props.uploaded[0].response.body.version
    }

    this.setSign = hash => {
      return crypto.createHash('sha1').update(hash, 'utf8')
        .digest('hex')
    }

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag)
    }

    this.stopEvent = ev => {
      ev.preventDefault()
      ev.stopPropagation()
    }

    this.onDragEnter = ev => {
      this.stopEvent(ev)
      console.log('File Detected')
    }

    this.onDragLeave = ev => {
      this.stopEvent(ev)
      this.setState({ hover: false })
    }

    this.onDragOver = ev => {
      this.stopEvent(ev)
      this.setState({ hover: true })
    }

    this.onDrop = ev => {
      this.stopEvent(ev)
      const { files } = ev.dataTransfer
      this.validateFiles(files)

      const reader = new FileReader()

      reader.onload = e =>
        this.setState({
          hover: false,
          upload: [e.target.result],
          uploads: [...e.target.result]
        })

      reader.readAsDataURL(ev.dataTransfer.files[0])

      console.log('validition complete')
      // this.handleUpload(files)
    }

    this.validateFiles = (files) => {
      const fileTypes = ['image/jpg', 'image/png', 'image/webp']
      if (fileTypes.indexOf(files[0].type) > -1) {
        // toast.success('file added to state')
      }
      else {
        toast.error('wrong file type')
      }
    }

    this.getRandomInt = max => {
      return Math.floor(Math.random() * Math.floor(max))
    }

    this.onProgress = (id, fileName, progress) => {
      this.props.onUploading({ id: id, fileName: fileName, progress: progress })
    }

    this.onUploaded = (id, fileName, response) => {
      this.props.onUploading({ id: id, fileName: fileName, response: response, })
      this.props.onUploaded([response.body])
    }

    this.handleUpload = files => {
      for (let file of files) {
        const id = this.uid++
        const medium = this.props.medium
        // const auth_email = this.props.common.currentUser.email
        // const auth_name = this.props.common.currentUser.username
        const name = `${medium}_${this.getRandomInt(999)}`
        request.post(CLOUD_UPLOAD)
          .field('file', file)
          .field('upload_preset', CLOUD_PRESET)
          .field('public_id', `${name}`)
          // .field('name', file)
          // .field('folder', `${medium}`)
          // .field('multiple', true)
          // .field('tags', [`${medium}`])
          // .field('context', `medium=${medium}|author_email=${auth_email}|author_name=${auth_name}`)
          .on('progress', progress => this.onProgress(id, file.name, progress))
          .end((err, response) => { this.onUploaded(id, name, response) })
      }
    }

    this.deleteUpload = () => {
      request
        .post(CLOUD_DELETE)
        .set('Content-Type', 'application/json')
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({ token: this.props.upload.response.body.delete_token })
        .then(this.onDeleteUpload.bind(this))
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

      const final = this.setSign('public_id=' + post.title + '&timestamp=' + this.getTimestamp(post) + CLOUD_SECRET)

      post.signature = final

      const slug = { slug: this.props.slug }
      const promise = this.props.slug
        ? agent.Posts.update(Object.assign(post, slug))
        : agent.Posts.create(post)

      this.props.onSubmit(promise)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload()
        return this.props.onLoad(agent.Posts.get(this.props.match.params.slug))
      }
      this.props.onLoad(null)
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

    const { hover, upload } = this.state
    const { loading } = this.props

    return (
      <Fragment>

        <ToastContainer />

        <Dropzone
          // accept={'image/*'}
          loading={loading}
          onDrop={this.onDrop}
          upload={this.state.upload}
          onDragEnter={this.onDragEnter}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          handleUpload={this.handleUpload}
          className={hover ? 'dropzone hover' : 'dropzone'}
          style={{ 'backgroundImage': `src(${upload})`, 'width': '100' }} />

        {/* {this.props.medium === '' ? null : (
          <Dropzone
            title={this.props.title}
            medium={this.props.medium} />
        )} */}

        <Errors errors={this.props.errors} />

        <form className='editor-form'>

          <SelectBox
            id="status"
            options={mediums}
            value={this.props.medium}
            onChange={this.changeMedium}
            error={this.props.errors}
            placeholder={'choose'}
            info=""
          />

          {/* <fieldset className='form-group'>
            <select
              className='select'
              onChange={this.changeMedium}>
              {mediums.map(medium => {
                return (
                  <option
                    key={medium}
                    value={medium}
                    className='select-option'>
                    {medium}
                  </option>
                )
              })}
            </select>
          </fieldset> */}

          {/* {this.props.uploaded > 1 ? (
            <fieldset className='form-group'>
              <input
                className='form-control form-control-lg'
                type='text'
                placeholder='Post Title'
                value={this.props.title}
                onChange={this.changeTitle} />
            </fieldset>
          ) : null} */}

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
