import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import reactStringReplace from 'react-string-replace'
import ReactEmoji from 'react-emoji'

import {
  TextMention,
} from '../../'

import {
  hashtag,
} from './style'

const TYPES = {
  'CLASS_NOTE': 'docs',
  'POST': 'post',
  'REVIEW': 'reviews',
  'QUESTION': 'questions',
}

const TextPost = ({ text, showUserInfo, currentPostType }) => {

  let parsedText = ReactEmoji.emojify(text)

  parsedText = reactStringReplace(parsedText, /#([ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿa-zA-Z0-9-]+)/g, (tag, i) => {
    let type
    if (currentPostType) {
      type = TYPES[currentPostType]
    }

    const link = type ? `/dashboard?type=${type}&hashtag=${tag}` : `/dashboard?hashtag=${tag}`
    return (
      <Link to={link} className={hashtag}>#{tag}</Link>
    )
  })

  parsedText = reactStringReplace(parsedText , /<@(.*?)>/g, (match, i) => {
    const segments = match
                      .replace('<@', '')
                      .replace('>', '')
                      .split('|')

    const userId = segments[0]
    const display = segments[1]

    return <TextMention key={`MENTION_${i}`} userId={userId} showUserInfo={showUserInfo} display={display} />
  })

  return (
    <span>{parsedText}</span>
  )
}

export default TextPost
