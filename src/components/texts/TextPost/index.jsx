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

  parsedText = reactStringReplace(parsedText, /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g, (match, i) => {
    return <a href={match} target="_blank" key={`${i}__${match}`}>{match}</a>
  })


   parsedText = reactStringReplace(parsedText, /&lt;/g, (match, i) => {
     return "<"
   })

   parsedText = reactStringReplace(parsedText, /&gt;/g, (match, i) => {
     return ">"
   })

  return (
    <span>{parsedText}</span>
  )
}

export default TextPost
