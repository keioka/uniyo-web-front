import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  ItemNotification,
  ButtonClose,
} from '../..'

import {
  wrapper,
  inner,
  header,
  headerInner,
  headerTitle,
  headerTitleNumber,
  ul,
  ulPastNotification,
  ulTitle,
  hr,
} from './style'

class SidebarRightNotification extends Component {

  render() {
    const {
      allNotifications,
      notificationReadMark,
      setReadNotificationIds,
      notificationSearch,
      hideSidebarRight,
      currentUser,
      showHistoryDonut,
      showUserInfo,
      postInfo,
      allPosts,
    } = this.props

    const countNotification = allNotifications.filter(notification => !notification.isRead).length
    const newNotification = allNotifications.filter((notification) => !notification.isRead)
    const pastNotifications = allNotifications.filter((notification) => notification.isRead)
    newNotification.forEach(notification => {
      if (notification.post && notification.post.type === 'ANSWER') {
        const post = notification.post && allPosts.filter(post => post.id === notification.post.id)[0]
        if (!post) {
          postInfo({ postId: notification.post.id })
        }
      }
    })

    pastNotifications.forEach(notification => {
      if (notification.post && notification.post.type === 'ANSWER') {
        const post = notification.post && allPosts.filter(post => post.id === notification.post.id)[0]
        if (!post) {
          postInfo({ postId: notification.post.id })
        }
      }
    })


    return (
      <div className={wrapper} >
        <header className={header}>
          <div className={headerInner}>
            <h3 className={headerTitle}>
              Notifications
            </h3>
            { countNotification > 0 && <span className={headerTitleNumber}>{countNotification}</span> }
          </div>
        </header>

        <div className={inner}>
          { allNotifications &&
            <div>
              <ul className={ul}>
                {newNotification.map(notification => {
                  const post = notification.post && allPosts.filter(post => post.id === notification.post.id)[0]
                  return (
                    <ItemNotification
                      post={post}
                      postInfo={postInfo}
                      currentUser={currentUser}
                      notification={notification}
                      notificationReadMark={notificationReadMark}
                      onVisiable={notificationReadMark}
                      showHistoryDonut={showHistoryDonut}
                      showUserInfo={showUserInfo}
                    />)
                 }
               )}
              </ul>

              {newNotification.length > 0 && <div className={hr}></div>}

              <h3 className={ulTitle}>Past Notifications 👵🏻</h3>

              <ul className={[ul, ulPastNotification].join(' ')}>
                {pastNotifications.map((notification, index) => {
                  const isLastNotification = (index === (pastNotifications.length - 1))
                  const post = notification.post && allPosts.filter(post => post.id === notification.post.id)[0]
                  return (
                    <ItemNotification
                      post={post}
                      currentUser={currentUser}
                      notification={notification}
                      notificationReadMark={notificationReadMark}
                      onVisiable={notificationReadMark}
                      notificationSearch={notificationSearch}
                      isLastNotification={isLastNotification}
                      showHistoryDonut={showHistoryDonut}
                      showUserInfo={showUserInfo}
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
