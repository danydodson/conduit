import React from 'react'
import { connect } from 'react-redux'
import Errors from '../../components/errors'
import Uploader from './uploader/uploader-redux'
import agent from '../../agent'

import {
  EDITOR_FORM_LOADED,
  EDITOR_UPDATE_FIELD,
  EDITOR_UPDATE_CHECKBOX,
  EDITOR_ADD_MEDIUM,
  EDITOR_REMOVE_MEDIUM,
  EDITOR_ADD_TAG,
  EDITOR_REMOVE_TAG,
  EDITOR_POST_SUBMITTED,
  EDITOR_FORM_UNLOADED,
} from '../../utilities/constants'

const mapStateToProps = state => ({ ...state, ...state.editor })

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: EDITOR_FORM_LOADED, payload }),
  onUpdateField: (key, value) =>
    dispatch({ type: EDITOR_UPDATE_FIELD, key, value }),
  onUpdateChecked: (key, value) =>
    dispatch({ type: EDITOR_UPDATE_CHECKBOX, key, value }),
  onAddMedium: () =>
    dispatch({ type: EDITOR_ADD_MEDIUM }),
  onRemoveMedium: medium =>
    dispatch({ type: EDITOR_REMOVE_MEDIUM, medium }),
  onAddTag: () =>
    dispatch({ type: EDITOR_ADD_TAG }),
  onRemoveTag: tag =>
    dispatch({ type: EDITOR_REMOVE_TAG, tag }),
  onSubmit: payload =>
    dispatch({ type: EDITOR_POST_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITOR_FORM_UNLOADED, payload })
})

class Editor extends React.Component {
  constructor() {
    super()

    const updateFieldEvent = key => e => this.props.onUpdateField(key, e.target.value)
    const updateCheckEvent = key => e => this.props.onUpdateChecked(key, e.target.checked)

    this.changeTitle = updateFieldEvent('title')
    this.changeDescription = updateFieldEvent('description')
    this.changeBody = updateFieldEvent('body')
    this.changeCategory = updateFieldEvent('category')
    this.changeMediumInput = updateFieldEvent('mediumInput')
    this.changeShareable = updateCheckEvent('shareable')
    this.changeAllowComments = updateCheckEvent('allow_comments')
    this.changePurchasable = updateCheckEvent('purchasable')
    this.changePrice = updateFieldEvent('price')
    this.changeTagInput = updateFieldEvent('tagInput')

    this.watchForEnter = e => {
      if (e.keyCode === 13) {
        e.preventDefault()
        if (e.target.id === 'tagList') {
          this.props.onAddTag()
        } if (e.target.id === 'mediumList') {
          this.props.onAddMedium()
        }
      }
    }

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag)
    }

    this.removeMediumHandler = medium => () => {
      this.props.onRemoveMedium(medium)
    }

    this.submitForm = e => {
      e.preventDefault()

      const post = {
        uploads: this.props.uploaded,
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        category: this.props.category,
        shareable: this.props.shareable,
        allow_comments: this.props.allow_comments,
        purchasable: this.props.purchasable,
        price: this.props.price,
        mediumList: this.props.mediumList,
        tagList: this.props.tagList,
      }

      const slug = { slug: this.props.postSlug }

      const promise = this.props.postSlug ?
        agent.Posts.update(Object.assign(post, slug)) :
        agent.Posts.create(post)

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

    return (
      <div className="editor-page">

        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <Errors errors={this.props.errors} />

              <form>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Post Title"
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </fieldset>

                  <fieldset className="form-group">
                    <Uploader
                      tags={this.props.tagList}
                      title={this.props.title}
                      category={this.props.category} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="What's this post about?"
                      value={this.props.description}
                      onChange={this.changeDescription} />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your post (in markdown)"
                      value={this.props.body}
                      onChange={this.changeBody}>
                    </textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <select value={this.props.category}
                      onChange={this.changeCategory}>
                      <option value="">Choose Category</option>
                      <option value="paint">Paint</option>
                      <option value="code">Code</option>
                      <option value="film">Film</option>
                      <option value="food">Food</option>
                    </select>
                  </fieldset>

                  <fieldset className="form-group">
                    shareable
                    <input
                      id="shareable"
                      type="checkbox"
                      placeholder='shareable'
                      value={this.props.shareable}
                      onChange={this.changeShareable} />
                  </fieldset>

                  <fieldset className="form-group">
                    allow_comments
                    <input
                      id="allow_comments"
                      type="checkbox"
                      placeholder='allow_comments'
                      value={this.props.allow_comments}
                      onChange={this.changeAllowComments} />
                  </fieldset>

                  <fieldset className="form-group">
                    purchasable
                    <input
                      id="purchasable"
                      type="checkbox"
                      placeholder='purchasable'
                      value={this.props.purchasable}
                      onChange={this.changePurchasable} />
                  </fieldset>

                  {
                    this.props.purchasable ? (
                      <fieldset className="form-group">
                        <input
                          id="price"
                          type="text"
                          placeholder='price'
                          value={this.props.price}
                          onChange={this.changePrice} />
                      </fieldset>
                    ) : null
                  }

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      id="mediumList"
                      placeholder="Enter mediums"
                      value={this.props.mediumInput}
                      onChange={this.changeMediumInput}
                      onKeyUp={this.watchForEnter} />

                    <div className="tag-list">
                      {(this.props.mediumList || []).map(medium => {
                        return (
                          <span className="tag-default tag-pill" key={medium}>
                            <i className="ion-close-round"
                              onClick={this.removeMediumHandler(medium)}>
                            </i>
                            {medium}
                          </span>
                        )
                      })}
                    </div>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      id="tagList"
                      placeholder="Enter tags"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter} />
                    <div className="tag-list">
                      {(this.props.tagList || []).map(tag => {
                        return (
                          <span className="tag-default tag-pill" key={tag}>
                            <i className="ion-close-round"
                              onClick={this.removeTagHandler(tag)}>
                            </i>
                            {tag}
                          </span>
                        )
                      })}
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Publish Post
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

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
