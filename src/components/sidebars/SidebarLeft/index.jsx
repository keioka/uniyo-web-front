import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  wrapper,
  newsfeed,
  newsfeedTag,
  newsfeedLabel,
} from './style'

export default ({ hashtags }) => (
  <aside className={wrapper} >
    <input type="text"/>
    <ul className={newsfeed}>
      <h4 className={newsfeedLabel}>News Feed</h4>
      { hashtags && hashtags.map(hashtag => <li><Link key={hashtag.hashtag} to={`dashboard?hashtag=${hashtag.hashtag}`} className={newsfeedTag}>#{hashtag.hashtag}</Link></li>) }
      <li><Link to={`dashboard?hashtag=kei`} className={newsfeedTag}>#ke</Link></li>
      <li><Link to={`dashboard?hashtag=kei`} className={newsfeedTag}>#ke</Link></li>
      <li><Link to={`dashboard?hashtag=kei`} className={newsfeedTag}>#ke</Link></li>
      <li><Link to={`dashboard?hashtag=kei`} className={newsfeedTag}>#ke</Link></li>
      <li><Link to={`dashboard?hashtag=kei`} className={newsfeedTag}>#ke</Link></li>
    </ul>
    <div>Signout</div>
  </aside>
)
