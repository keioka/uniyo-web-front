import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  ListNotification,
} from '../..'

import {
  wrapper,
  header,
  headerTitle,
  ul,
} from './style'

class SidebarRightNotification extends Component {


  // onClick => read
  // window scroll => read

  // isRead false and is same channel and show latest time and

  render() {
    const { allNotifications, notificationReadMark, setReadNotificationIds } = this.props

    const countNotification = allNotifications.filter(notification => !notification.isRead).length

    return (
      <div className={wrapper} >
        <header className={header}>
          <h3 className={headerTitle} data-count-notification={countNotification}>Notification</h3>
        </header>
        <ul className={ul}>
          { allNotifications &&
            allNotifications.map(notification =>
                              <ListNotification
                                notification={notification}
                                notificationReadMark={notificationReadMark}
                                onVisiable={notificationReadMark}
                              />)
          }
        </ul>
      </div>
    )
  }
}

export default SidebarRightNotification
