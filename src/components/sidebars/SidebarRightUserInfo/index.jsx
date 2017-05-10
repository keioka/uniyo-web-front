import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'

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
} from './style'

const userInfo = ({ user, channelCreate, channels }) => {

  const onClickBtnMessage = () => {
    const filteredChannel = channels.filter(channel => {
      // check if current user has channel with the other user
      // check channel is not group because it is supposed to be 1 to 1 chat
      // check if the other user id is included. [0] is the other user and [1] is current user
      return channel.users.length === 2 && channel.users[0].id == user.id
    })
    const channel = filteredChannel[0]

    if (channel) {
      browserHistory.push(`/dashboard/channels/${channel.id}`)
    } else {
      channelCreate({ users: [user.id] })
    }
  }

  return (
    <div className={wrapper} >
      <div className={boxImg}>
        <img className={imageProfile} src={user.image.largeUrl} alt=""/>
      </div>
      <div className={profile}>
        <div className={profileName}>
          <h3 className={profileNameH3}>{user.name}</h3>
        </div>
        <div className={profileNav}>
          <button onClick={onClickBtnMessage}>Message</button>
          <button>Donut</button>
        </div>
      </div>
      <div className={tags}>
        <ul className={tagsList}>
          {user.hashtags && user.hashtags.map(hashtag => <li className={tagsItem}><Link to={`dashboard?hashtag=${hashtag.hashtag}`}>#{hashtag.hashtag}</Link></li>)}
        </ul>
      </div>
    </div>
  )
}

userInfo.defaultProps = {
  user: {
    hashtags: [],
    name: '',
    image: {
      largeURL: 'https://uniyo.s3.amazonaws.com/users/profile/large/541_f53b1f4364a4415ebdbda4dd0af1ca51.jpg'
    }
  }
}

export default userInfo
