import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {
  wrapper,
  item,
  itemActive,
} from './style'

const types = [
  { id: 1, name: 'ALL', title: 'All posts', path: null },
  { id: 2, name: 'REVIEW', title: 'Reviews', path: 'reviews' },
  { id: 3, name: 'QUESTION', title: 'Questions', path: 'questions' },
  { id: 4, name: 'DOC', title: 'Documents', path: 'docs' },
]


const dashboardPathGenarator = ({ hashtag, type }) => {
  let path = 'dashboard'

  if (hashtag || type) {
    path += '?'
  }

  if (hashtag) {
    path += `hashtag=${hashtag}`
  }

  if (hashtag && type) {
    path += '&'
  }

  if (type) {
    path += `type=${type}`
  }

  return path
}


export default ({ currentPostType, onSelectPostType, currentHashTag }) => {
  return (
    <ul className={wrapper}>
      {types.map((type) => {
        const classNames = [item]
        if (type.name === currentPostType) {
          classNames.push(itemActive)
        }
        const path = dashboardPathGenarator({ hashtag: currentHashTag, type: type.path })
        return (
          <li
            key={type.id}
            className={classNames.join(' ')}
          >
            <Link to={path}>{type.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}
