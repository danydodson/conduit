import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import Dropzone from '../form/dropzone'
import Checkbox from '../form/checkbox'
import TextArea from '../form/textarea'
import Select from '../form/select'
import Input from '../form/input'

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
        medium: this.props.medium,
        title: this.props.medium,
        description: this.props.description,
        body: this.props.body,
        shareable: this.props.shareable,
        allow_comments: this.props.allow_comments,
        purchasable: this.props.purchasable,
        price: this.props.price,
        tagList: this.props.tagList,
        signature: this.props.signature,
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

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {

    return (
      <Fragment>

        {this.props.medium === ''
          ? null
          : <Dropzone
            medium={this.props.medium} />
        }

        <form className='editor-form'>

          <Select
            value={this.props.medium}
            version={this.random(999)}
            onChange={this.changeMedium} />

          <Input
            name='description'
            placeholder="What's this post about?"
            value={this.props.description}
            onChange={this.changeDescription} />

          <TextArea
            name='description'
            rows='8'
            placeholder='Write your post (in markdown)'
            value={this.props.body}
            onChange={this.changeBody} />

          <Checkbox
            label='shareable'
            name='description'
            checked={this.props.shareable}
            value={this.props.shareable}
            onChange={this.changeShareable} />

          <Checkbox
            label='allow_comments'
            name='allow_comments'
            checked={this.props.allow_comments}
            value={this.props.allow_comments}
            onChange={this.changeAllowComments} />

          <Checkbox
            label='purchasable'
            name='purchasable'
            checked={this.props.purchasable}
            value={this.props.purchasable}
            onChange={this.changePurchasable} />

          {this.props.purchasable ? (
            <Input
              name='price'
              value={this.props.price}
              onChange={this.changePrice} />
          ) : null}

          <Input
            type='text'
            name='tags_list'
            placeholder='Enter tags'
            value={this.props.tagInput}
            onChange={this.changeTagInput}
            onKeyUp={this.watchForEnter}
            tagsList={this.props.tagsList}
            onClick={this.removeTagHandler.bind(this)} />

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
