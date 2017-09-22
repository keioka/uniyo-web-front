import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router'
import reactStringReplace from 'react-string-replace'
import ReactEmoji from 'react-emoji'
import { Emoji } from 'emoji-mart'

import {
  TextMention,
} from '../../'

import {
  hashtag,
  element,
} from './style'

const TYPES = {
  'CLASS_NOTE': 'docs',
  'POST': 'post',
  'REVIEW': 'reviews',
  'QUESTION': 'questions',
}

export default class TextPost extends PureComponent {

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { text, showUserInfo, currentPostType } = this.props
    let parsedText = text.replace(/&lt;/g, (match, i) => '<')
    parsedText = parsedText.replace(/&gt;/g, (match, i) => '>')
    /*
      regex to match :D, :santa::skin-tone-3:
    */
    parsedText = reactStringReplace(parsedText, /(^:[a-zA-Z0-9_)(\-:]+)(?:)/g, (match, i) => <Emoji emoji={match} size='16px'/>)

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
      const displayName = segments[1]

      return <TextMention key={`MENTION_${i}`} userId={userId} showUserInfo={showUserInfo} display={displayName} />
    })

    parsedText = reactStringReplace(parsedText, /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g, (match, i) => {
      return <a href={match} target="_blank" key={`${i}__${match}`}>{match}</a>
    })

    return (
      <span className={element}>{parsedText}<Emoji emoji={':D'} size='16px'/></span>
    )
  }
}
