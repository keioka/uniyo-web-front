import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  barFilter,
  btn,
  pink,
  yellow,
  blue,
  purple,
} from './style'

import Cross from './cross'
import Plus from './plus'

const BarTag = ({
  type,
  currentPostType,
  hashtag,
  hashtagAdd,
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

  const onAddHashtag = () => {
    hashtagAdd({
      hashtags: [hashtag],
      tagType: 'Campus',
    })
  }

  const classNames = [ barFilter, color ]
  return (
    <div
      className={classNames.join(' ')}
      onClearCurrentTypeHandler={onClearCurrentTypeHandler}
    >
      <span>#{hashtag}</span>
      <Link
        to={type ? `dashboard?type=${type}` : `dashboard`}
        className={btn}
      >
        <Cross />
      </Link>
      <span className={btn} onClick={() => onAddHashtag()}>
        <Plus />
      </span>
   </div>
  )
}

export default BarTag
