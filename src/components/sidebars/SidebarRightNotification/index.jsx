import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  ListNotification,
} from '../..'

import {
  wrapper,
  inner,
  header,
  headerTitle,
  headerTitleNumber,
  ul,
  ulPastNotification,
  ulTitle,
  hr,
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
      hideSidebarRight,
    } = this.props

    const countNotification = allNotifications.filter(notification => !notification.isRead).length
    const newNotification = allNotifications.filter((notification) => !notification.isRead)
    const pastNotifications = allNotifications.filter((notification) => notification.isRead)

    return (
      <div className={wrapper} >
        <header className={header}>
          <div>
            <h3 className={headerTitle}>
              Notifications
            </h3>
            { countNotification > 0 && <span className={headerTitleNumber}>{countNotification}</span> }
          </div>
          <span onClick={() => hideSidebarRight()}>X</span>
        </header>

        <div className={inner}>
          { allNotifications &&
            <div>
              <ul className={ul}>
                {newNotification.map(notification =>
                  <ListNotification
                    notification={notification}
                    notificationReadMark={notificationReadMark}
                    onVisiable={notificationReadMark}
                  />
                )}
              </ul>

              {newNotification.length > 0 && <div className={hr}></div>}

              <h3 className={ulTitle}>Past Notification 👵🏻</h3>

              <ul className={[ul, ulPastNotification].join(' ')}>
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
              </ul>

            </div>
          }
        </div>
      </div>
    )
  }
}

export default SidebarRightNotification
