import React, { Component, PropTypes } from 'react'

import {
  inputText
} from './style'

export default (props) => {
  const { postId, className, commentCreate } = props
  console.log(commentCreate)
  const classNames = `${inputText} ${className}`
  const onKeyDownHandler = (event) => {
    console.log(event)
    if (event.key === 'Enter'){
      commentCreate({ postId , text: event.target.value })
    }
  }

  return (
    <span>
      <input
        className={inputText}
        data-user-image={"https://uniyo.s3.amazonaws.com/users/profile/small/541_f53b1f4364a4415ebdbda4dd0af1ca51.jpg"}
        onKeyDown={onKeyDownHandler}
        type="text"
      />
    </span>
  )
}
