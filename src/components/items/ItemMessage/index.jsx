import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import {
  TextPost,
} from '../../'

import {
  boxImage,
  fontName,
  fontTime,
  imgUser,
  wrapper,
  sectionContent,
  paragaph,
} from './style.scss'

class ItemMessage extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.messages.length !== this.props.messages.length) {
      return true
    }
    return false
  }

  render() {
    const { messages, showUserInfo } = this.props
    const message = messages[0]
    const { id, user } = message
    const time = moment.utc(message.createdAt).local().format("HH:mm A")
    const key = `$li_message_key__${id}`
    const keyText = (message) => `$p_message_text_key__${message.id}`
    const componentsMessages = messages.map(message => <p key={keyText(message)} className={paragaph}><TextPost text={message.text} showUserInfo={showUserInfo} /></p>)
    const onClickUserInfo = () => showUserInfo(user.id)
    return (
      <li key={key} className={wrapper}>
        <div className={boxImage} onClick={onClickUserInfo}>
          <img src={user.image.smallUrl} className={imgUser} />
        </div>
        <div className={sectionContent}>
          <span className={fontName} onClick={onClickUserInfo}>{user.firstName} {user.lastName}</span>
          <span className={fontTime}>{time}</span>
          {componentsMessages}
        </div>
      </li>
    )
  }
  // TODO: what if long comment
}

export default ItemMessage
