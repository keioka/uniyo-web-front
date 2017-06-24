import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'

import {
  ButtonDonut,
} from '../../'

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
  profileNav,
  profileName,
  profileNameH3,
  tags,
  tagsList,
  tagsItem,
  btnMessage,
} from './style'

const uniq = (array, param) => {
  return array.filter((item, pos, array) => {
    return array.map((mapItem) => mapItem[param]).indexOf(item[param]) === pos
  })
}

export default class SidebarRightUserInfo extends Component {
  render() {
    const { allUsers, channelCreate, channels, userGiveDonuts, userId, currentUser } = this.props
    const user = allUsers.filter(user => user.id === userId)[0]

    const onClickBtnMessage = () => {
      const filteredChannel = channels.filter(channel => {
        const users = usersWithoutCurrentUser(channel.users, currentUser)
        // check if current user has channel with the other user
        // check channel is not group because it is supposed to be 1 to 1 chat
        // check if the other user id is included. [0] is the other user and [1] is current user
        return users.length === 1 && users[0].id == userId
      })

      const channel = filteredChannel[0]

      if (channel) {
        browserHistory.push(`/dashboard/channels/${channel.id}`)
      } else {
        channelCreate({ users: [userId] })
      }
    }

    const uniqueHashtagsCurrentUser = user.hashtags && uniq(user.hashtags, 'hashtag')
    return (
      <div className={wrapper} >
        {user ?
          <div>
            <div className={boxImg}>
              <img className={imageProfile} src={user.image.largeUrl} alt=""/>
              <div className={profile}>
                <div className={profileName}>
                  <h3 className={profileNameH3}>{user.firstName} {user.lastName}</h3>
                </div>
                <div className={profileNav}>
                  <button className={btnMessage} onClick={onClickBtnMessage}>Message</button>
                  <ButtonDonut
                    onClick={() => userGiveDonuts({ userId: user.id, amount: 1 })}
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
