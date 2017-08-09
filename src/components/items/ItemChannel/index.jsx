import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'

import {
  sectionTag,
  iconOnline,
  iconOffline,
  iconChannel,
  iconNumberNewMessage,
  iconChannelOnlineStatus,
  fontUserNames,
  sectionTagMain,
  sectionTagActive,
} from './style'

import {
  decorator,
} from '../../../utils'

const {
  usersWithoutCurrentUser,
} = decorator

const ItemChannel = ({
  className,
  channel,
  amountNewMessage,
  currentUser,
  contentReadCheckNotification,
  unReadChannelIds,
  isSelected,
  users
}) => {
  const isMyChannel = users && users.length === 1 && users[0].id === currentUser.id
  const name = isMyChannel ? `${currentUser.firstName} (you)` : usersWithoutCurrentUser(users, currentUser).map(user => user.firstName).join(', ')
  const ids = unReadChannelIds.filter((idsObject) => idsObject.channelId === channel.id)
  const liClassNames = isSelected ? [sectionTag, sectionTagActive] : [sectionTag]
  return (
    <Link
      className={className}
      key={channel.id}
      to={`/dashboard/channels/${channel.id}`}
      onClick={() => contentReadCheckNotification({ contentType: 'MESSAGE_READ', ids })}
    >
      <li className={liClassNames.join(' ')}>
        {users.length > 2 ?
          (<span data-amount-users={users.length} className={iconChannel}>
            {users.length - 1}
          </span>) :
          (<span data-user-online className={iconChannelOnlineStatus}>
             {usersWithoutCurrentUser(users, currentUser)[0].isOnline ? <span className={iconOnline} /> : <span className={iconOffline} />}
           </span>)
        }
        <span className={sectionTagMain}>
          <span className={fontUserNames}>{name}</span>
          {amountNewMessage > 0 && <span className={iconNumberNewMessage}>{amountNewMessage}</span>}
        </span>
      </li>
    </Link>
  )
}

export default ItemChannel
