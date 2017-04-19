import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import reactStringReplace from 'react-string-replace'

import {
  hashtag,
} from './'

export default ({ text }) => {
  const parsedText = reactStringReplace(text, /#([ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿa-zA-Z0-9-]+)/g, (tag, i) => {
    return (
      <Link to={`/dashboard?hashtag=${tag}`}>#{tag}</Link>
    )
  })
  return (
    <span>{parsedText}</span>
  )
}
