import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  wrapper,
  section,
  sectionTag,
  sectionLabel,
} from './style'

const dashboardPathGenarator = ({ hashtag, type }) => {
  let path = 'dashboard'

  if (hashtag || type) {
    path += '?'
  }

  if (hashtag) {
    path += `hashtag=${hashtag}`
  }

  if (hashtag && type) {
    path += '&'
  }

  if (type) {
    path += `type=${type}`
  }

  return path
}

export default ({ hashtags, type }) => {
  let keywordForSort = ''
  //let hashtags = hashtags.filter(hashtag => hashtag.macth)

  return (
    <aside className={wrapper} >
      <input type="text"/>
      <ul className={section}>
        <h4 className={sectionLabel}>News Feed</h4>
        { hashtags && hashtags.map(hashtag =>
          <li>
            <Link
              key={hashtag.hashtag}
              to={dashboardPathGenarator({ hashtag: hashtag.hashtag, type })}
              className={sectionTag}>#{hashtag.hashtag}
            </Link>
          </li>)
        }
      </ul>

      <ul className={section}>
        <h4 className={sectionLabel}>TRENDING TOPIC</h4>
        { hashtags && hashtags.map(hashtag =>
          <li>
            <Link
              key={hashtag.hashtag}
              to={dashboardPathGenarator({ hashtag: hashtag.hashtag, type })}
              className={sectionTag}>#{hashtag.hashtag}
            </Link>
          </li>)
        }
      </ul>
      <div>Signout</div>
    </aside>
  )
}
