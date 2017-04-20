import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {
  wrapper,
  item,
  itemActive,
} from './style'

export default ({ currentPostType, onSelectPostType, currentHashTag }) => {
  const types = [
    { id: 1, name: 'ALL', title: 'All posts', path: '/dashboard'},
    { id: 2, name: 'REVIEW', title: 'Reviews', path: '/dashboard?type=reviews'},
    { id: 3, name: 'QUESTION', title: 'Questions', path: '/dashboard?type=questions'},
    { id: 4, name: 'DOC', title: 'Documents', path: '/dashboard?type=docs'},
  ]
  return (
    <ul className={wrapper}>
      {types.map(type => {
        let classNames = [item]
        if (type.name === currentPostType) {
          classNames.push(itemActive)
        }
        return (
          <li key={type.id}
            className={classNames.join(" ")}
            onClick={() => onSelectPostType(type.name)}
          >
            <Link to={`${type.path}?hashtags=${currentHashTag}`}>{type.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}
