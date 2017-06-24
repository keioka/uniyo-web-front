import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'

import {
  sectionTag,
  iconOnline,
  iconChannel,
  iconNumberNewMessage,
  iconChannelOnlineStatus,
  fontUserNames,
  sectionTagMain,
} from './style'

import {
  decorator,
} from '../../../utils'

const {
  usersWithoutCurrentUser,
} = decorator

const ListChannel = ({ className, channel, amountNewMessage, currentUser, contentReadCheckNotification, unReadChannelIds }) => {
  const name = usersWithoutCurrentUser(channel.users, currentUser).map(user => user.firstName).join(', ')
  const ids = unReadChannelIds.filter((idsObject) => idsObject.channelId === channel.id)
  return (
    <Link
      className={className}
      key={channel.id}
      to={`/dashboard/channels/${channel.id}`}
      onClick={() => contentReadCheckNotification({ contentType: 'MESSAGE_READ', ids })}
    >
      <li className={sectionTag}>
        {channel.users.length > 2 ?
          (<span data-amount-users={channel.users.length} className={iconChannel}>
            {channel.users.length - 1}
          </span>) : (<span data-user-online className={iconChannelOnlineStatus}><span className={iconOnline} /></span>)
        }
        <span className={sectionTagMain}>
          <span className={fontUserNames}>{name}</span>
          {amountNewMessage > 0 && <span className={iconNumberNewMessage}>{amountNewMessage}</span>}
        </span>
      </li>
    </Link>
  )
}

export default ListChannel
