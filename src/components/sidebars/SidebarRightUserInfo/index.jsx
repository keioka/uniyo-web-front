import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

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

const userInfo = ({ user }) => {
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
          <button>Message</button>
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
