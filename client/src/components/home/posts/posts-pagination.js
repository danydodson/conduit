import React from 'react'
import agent from '../../../middleware/middle-agent'
import { connect } from 'react-redux'
import { SET_VIEW_PAGE_ } from '../../../constants'

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch({ type: SET_VIEW_PAGE_, page, payload })
})

const ListPagination = props => {

  if (props.postsCount <= 30) return null // original was <= 10

  const range = []

  for (let i = 0; i < Math.ceil(props.postsCount / 10); ++i) {
    range.push(i)
  }

  const setPage = page => {
    if (props.pager) {
      props.onSetPage(page, props.pager(page))
    } else {
      props.onSetPage(page, agent.Posts.all(page))
    }
  }

  return (
    <ul className="pagination">
      {
        range.map(v => {
          const isCurrent = v === props.currentPage
          const onClick = ev => {
            ev.preventDefault()
            setPage(v)
            window.scrollTo(0, 0)
          }
          return (
            <li
              key={v.toString()}
              onClick={onClick}
              className={isCurrent ? '' : ''}>
              <button className="page-link" href="">{v + 1}</button>
            </li>
          )
        })
      }
    </ul>
  )
}

export default connect(() => ({}), mapDispatchToProps)(ListPagination)
