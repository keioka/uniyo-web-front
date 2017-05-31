import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  barFilter,
  btnClose,
  pink,
  yellow,
  blue,
  purple,
} from './style'

import Cross from './cross'

const BarTag = ({
  type,
  currentPostType,
  hashtag,
  onClearCurrentTypeHandler,
}) => {
  let color
  switch (currentPostType) {
    case 'QUESTION': {
      color = blue
      break
    }

    case 'REVIEW': {
      color = yellow
      break
    }

    case 'CLASS_NOTE': {
      color = purple
      break
    }

    default: {
      color = pink
    }
  }

  const classNames = [ barFilter, color ]
  return (
    <div
      className={classNames.join(' ')}
      onClearCurrentTypeHandler={onClearCurrentTypeHandler}
    >
      <Link
        to={type ? `dashboard?type=${type}` : `dashboard`}
        className={btnClose}
      >
        <Cross />
      </Link>
      <span>#{hashtag}</span>
   </div>
  )
}

export default BarTag
