import React, { Component, PropTypes } from 'react'

import {
  wrapper,
  newsfeed,
  newsfeedTag
} from './style'

export default ({ hashtags }) => (
  <aside className={wrapper} >
    <ul className={newsfeed}>
      { hashtags && hashtags.map(hashtag => <li key={hashtag.hashtag} className={newsfeedTag}>#{hashtag.hashtag}</li>) }
    </ul>
  </aside>
)
