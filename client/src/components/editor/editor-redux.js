import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Select from '../form/select'
import Dropzone from '../form/dropzone'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import agent from '../../agent'
import crypto from 'crypto'

import {
  CLOUD_SECRET
} from '../../configs'

import {
  EDITOR_FORM_LOADED,
  EDITOR_FORM_UNLOADED,
  EDITOR_TAG_ADDED,
  EDITOR_TAG_REMOVED,
  EDITOR_TEXT_FIELD_UPDATE,
  EDITOR_CHECKBOX_SWITCHED,
  EDITOR_POST_SUBMITTED,
  TOASTIFY,
} from '../../actions'

const mapStateToProps = state => ({ ...state, ...state.editor })

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: EDITOR_FORM_LOADED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITOR_FORM_UNLOADED, payload }),
  onSubmit: payload =>
    dispatch({ type: EDITOR_POST_SUBMITTED, payload }),
  onAddTag: () =>
    dispatch({ type: EDITOR_TAG_ADDED }),
  onRemoveTag: tag =>
    dispatch({ type: EDITOR_TAG_REMOVED, tag }),
  onUpdateField: (key, value) =>
    dispatch({ type: EDITOR_TEXT_FIELD_UPDATE, key, value }),
  onUpdateChecked: (key, checked) =>
    dispatch({ type: EDITOR_CHECKBOX_SWITCHED, key, checked }),
  showNotice: () =>
    dispatch({ type: TOASTIFY }),
})

class Editor extends React.Component {
  constructor(props) {
    super(props)

    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
    const updateCheckEvent = key => ev => this.props.onUpdateChecked(key, ev.target.checked)

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

    this.watchForEnter = e => {
      if (e.keyCode === 13) {
        e.preventDefault()
        this.props.onAddTag()
      }
    }

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag)
    }

    this.submitForm = ev => {
      ev.preventDefault()

      const post = {
        uploads: this.props.uploads,
        description: this.props.description,
        body: this.props.body,
        medium: this.props.medium,
        title: this.props.medium,
        shareable: this.props.shareable,
        allow_comments: this.props.allow_comments,
        purchasable: this.props.purchasable,
        price: this.props.price,
        signature: this.props.signature,
        tagList: this.props.tagList,
      }

      const final = this.setSign(
        'public_id=' + post.title
        + '&timestamp=' + this.getTimestamp(post)
        + CLOUD_SECRET
      )

      post.signature = final

      const slug = { slug: this.props.slug }

      const promise = this.props.slug
        ? agent.Posts.update(Object.assign(post, slug))
        : agent.Posts.create(post)

      this.props.onSubmit(promise)
    }
  }

  UNSAFE_componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Posts.get(this.props.match.params.slug))
    }
    this.props.onLoad(null)
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

  createTitle = (medium) => `${medium}_${this.random(999)}`

  componentDidUpdate = () => {
    this.createTitle = this.createTitle.bind(this)
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {

    return (
      <Fragment>

        <ToastContainer />

        {this.props.medium === ''
          ? null
          : <Dropzone medium={this.props.medium} />
        }

        <form className='editor-form'>

          <Select
            value={this.props.medium}
            version={this.random(999)}
            onChange={this.changeMedium} />

          <fieldset className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder="What's this post about?"
              value={this.props.description}
              onChange={this.changeDescription} />
          </fieldset>

          <fieldset className='form-group'>
            <textarea
              rows='8'
              className='form-control'
              placeholder='Write your post (in markdown)'
              value={this.props.body}
              onChange={this.changeBody}>
            </textarea>
          </fieldset>

          <fieldset className='form-group'>
            {'shareable'}
            <input
              // name='shareable'
              type='checkbox'
              // placeholder='shareable'
              checked={this.props.shareable}
              value={this.props.shareable}
              onChange={this.changeShareable} />
          </fieldset>



          <fieldset className='form-group'>
            {'allow_comments'}
            <input
              // name='allow_comments'
              type='checkbox'
              // placeholder='allow_comments'
              checked={this.props.allow_comments}
              value={this.props.allow_comments}
              onChange={this.changeAllowComments} />
          </fieldset>

          <fieldset className='form-group'>
            {'purchasable'}
            <input
              // name='purchasable'
              type='checkbox'
              // placeholder='purchasable'
              checked={this.props.purchasable}
              value={this.props.purchasable}
              onChange={this.changePurchasable} />
          </fieldset>

          {this.props.purchasable ? (
            <fieldset className='form-group'>
              <input
                // id='price'
                type='text'
                // placeholder='price'
                value={this.props.price}
                onChange={this.changePrice} />
            </fieldset>
          ) : null}

          <fieldset className='form-group'>
            <input
              type='text'
              className='form-control'
              // id='tagList'
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
