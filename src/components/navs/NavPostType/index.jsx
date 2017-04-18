import React, { Component, PropTypes } from 'react'

import {
  wrapper,
  item,
  itemActive,
} from './style'

export default ({ currentPostType, onSelectPostType }) => {
  const types = [
    { id: 1, name: 'ALL' , title: 'All posts'},
    { id: 2, name: 'REVIEW' , title: 'Reviews'},
    { id: 3, name: 'QUESTION' , title: 'Questions'},
    { id: 4, name: 'DOC' , title: 'Documents'},
  ]
  return (
    <ul className={wrapper}>
      {types.map(type => {
        let classNames = [item]
        if (type.name === currentPostType) {
          classNames.push(itemActive)
        }
        return (
          <li key={type.id} className={classNames.join(" ")} onClick={() => onSelectPostType(type.name)}>{type.title}</li>
        )
      })}


    </ul>
  )
}
