import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {
  wrapper,
  item,
  itemActive,
  itemActiveAll,
  itemActiveReview,
  itemActiveQuestion,
  itemActiveDoc,
} from './style'

const types = [
  { id: 1, name: 'ALL', title: 'All posts', path: null },
  { id: 2, name: 'REVIEW', title: 'Reviews', path: 'reviews' },
  { id: 3, name: 'QUESTION', title: 'Questions', path: 'questions' },
  { id: 4, name: 'CLASS_NOTE', title: 'Documents', path: 'docs' },
]


const dashboardPathGenarator = ({ hashtag, type }) => {
  let path = '/dashboard'

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


 const NavPostType = ({ currentPostType, onSelectPostType, currentHashTag }) => {
  return (
    <ul className={wrapper}>
      {types.map((type) => {
        const classNames = [item]

        if (type.name === currentPostType) {
          if (currentPostType === 'ALL') {
            classNames.push(itemActiveAll)
          }

          if (currentPostType === 'REVIEW') {
            classNames.push(itemActiveReview)
          }

          if (currentPostType === 'QUESTION') {
            classNames.push(itemActiveQuestion)
          }

          if (currentPostType === 'CLASS_NOTE') {
            classNames.push(itemActiveDoc)
          }

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

export default NavPostType
