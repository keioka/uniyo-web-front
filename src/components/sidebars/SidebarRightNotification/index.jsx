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
  ulTitle,
} from './style'

class SidebarRightNotification extends Component {


  // onClick => read
  // window scroll => read

  // isRead false and is same channel and show latest time and

  render() {
    const {
      allNotifications,
      notificationReadMark,
      setReadNotificationIds,
      notificationSearch,
    } = this.props

    const countNotification = allNotifications.filter(notification => !notification.isRead).length
    const newNotification = allNotifications.filter((notification) => !notification.isRead)
    const pastNotifications = allNotifications.filter((notification) => notification.isRead)

    return (
      <div className={wrapper} >
        <header className={header}>
          <h3 className={headerTitle} data-count-notification={countNotification}>
            Notification
          </h3>
        </header>
        <ul className={ul}>
          { allNotifications &&
          <div>
            {newNotification.map(notification =>
              <ListNotification
                notification={notification}
                notificationReadMark={notificationReadMark}
                onVisiable={notificationReadMark}
              />
            )}
            <h3 className={ulTitle}>Past Notification 👵🏻</h3>
            {pastNotifications.map((notification, index) => {
              const isLastNotification = (index === (pastNotifications.length - 1))
              return (
                <ListNotification
                  notification={notification}
                  notificationReadMark={notificationReadMark}
                  onVisiable={notificationReadMark}
                  notificationSearch={notificationSearch}
                  isLastNotification={isLastNotification}
                />
              )
            })}
          </div>
          }
        </ul>
      </div>
    )
  }
}

export default SidebarRightNotification
