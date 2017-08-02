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
} from './style'

class ListMessage extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.messages.length !== nextProps.messages.length)
  }

  componentDidUpdate() {
    console.warn('updated')
  }

  render() {
    const { messages, showUserInfo } = this.props
    const message = messages[0]
    const { id, user } = message
    const time = moment.utc(message.createdAt).local().format("HH:mm A")
    const key = `$li_message_key__${id}`
    const componentsMessages = messages.map(message => <p className={paragaph}><TextPost text={message.text} showUserInfo={showUserInfo} /></p>)
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

export default ListMessage
