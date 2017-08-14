import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'

import {
  ButtonDonut,
} from '../../'

import { MdAddAPhoto } from 'react-icons/lib/md'

import {
  decorator,
} from '../../../utils'

const {
  usersWithoutCurrentUser,
} = decorator

import {
  wrapper,
  boxImg,
  imageProfile,
  profile,
  profileIconUpdate,
  profileNav,
  profileName,
  profileNameH3,
  tags,
  tagsList,
  tagsItem,
  btnMessage,
  overlayerProfilePictureUpdate,
  iconOnlineStatus,
  iconOnline,
  iconOffline,
} from './style'

const uniq = (array, param) => {
  return array.filter((item, pos, array) => {
    return array.map((mapItem) => mapItem[param]).indexOf(item[param]) === pos
  })
}

export default class SidebarRightUserInfo extends Component {

  state = {
    isShowProfilePictureUpload: true,
  }

  render() {
    const { allUsers, channelCreate, channels, userGiveDonuts, userId, currentUser, openUpdateProfile, showHistoryDonut } = this.props
    const user = allUsers.filter(user => user.id === userId)[0]
    const isCurrentUser = currentUser.id === userId

    const onClickBtnMessage = () => {
      const filteredChannel = channels.filter(channel => {
        const users = usersWithoutCurrentUser(channel.users, currentUser)
        // check if current user has channel with the other user
        // check channel is not group because it is supposed to be 1 to 1 chat
        // check if the other user id is included. [0] is the other user and [1] is current user
        return users.length === 1 && users[0].id == userId
      })

      const channel = filteredChannel[0]

      if (isCurrentUser && channels[0]) {
        browserHistory.push(`/dashboard/channels/${channels[0].id}`)
        return
      }

      if (channel) {
        browserHistory.push(`/dashboard/channels/${channel.id}`)
      } else {
        channelCreate({ users: [userId] })
      }
    }

    const uniqueHashtagsCurrentUser = user.hashtags && uniq(user.hashtags, 'hashtag')
    const onClickDonuts = () => isCurrentUser ? showHistoryDonut(1) : userGiveDonuts({ userId: user.id, amount: 1 })
    return (
      <div>
        <div className={wrapper} >
          {user ?
            <div>
              <div className={boxImg}>
                {isCurrentUser &&
                <div className={profileIconUpdate} onClick={openUpdateProfile}>
                  <MdAddAPhoto />
                </div>}
                <img className={imageProfile} src={user.image.largeUrl} alt="" />
                <div className={profile}>
                  <div className={profileName}>
                    <h3 className={profileNameH3}>{user.firstName} {user.lastName}</h3>
                    <span className={iconOnlineStatus}>{user.isOnline ? <span className={iconOnline}></span> : <span className={iconOffline}></span>}</span>
                  </div>
                  <div className={profileNav}>
                    <button className={btnMessage} onClick={onClickBtnMessage}>Message</button>
                    <ButtonDonut
                      onClick={onClickDonuts}
                      donutsCount={user.receivedDonutsCount}
                    />
                  </div>
                </div>
              </div>

              <div className={tags}>
                <ul className={tagsList}>
                  {uniqueHashtagsCurrentUser && uniqueHashtagsCurrentUser.map(hashtag => <li className={tagsItem}><Link to={`dashboard?hashtag=${hashtag.hashtag}`}>#{hashtag.hashtag}</Link></li>)}
                </ul>
              </div>
            </div>
            : null}
          </div>
        </div>
      )
    }
  }

  SidebarRightUserInfo.defaultProps = {
    user: {
      hashtags: [],
      name: '',
      image: {
        largeURL: 'https://uniyo.s3.amazonaws.com/users/profile/large/541_f53b1f4364a4415ebdbda4dd0af1ca51.jpg'
      }
    }
  }
