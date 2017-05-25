import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import Close from './close'

import {
  TextPost,
} from '../../'

import {
  wrapper,
  tag,
  btnClose,
} from './style'

function hashCode(str) {
  return str.split('').reduce((prevHash, currVal) =>
  ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0)
}

const dashboardPathGenarator = ({ hashtag, type }) => {
  let path = '/dashboard'

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

class ListHashtag extends PureComponent {
  render() {
    const {
      className,
      hashtag,
      hashtagType,
      type,
      showBtnDelete,
      hashtagDelete
    } = this.props
    return (
      <li className={wrapper}>
        <Link
          className={className}
          key={hashCode(hashtag)}
          to={dashboardPathGenarator({ hashtag })}
          >
            <span className={tag}>#{hashtag}</span>
          </Link>

          { showBtnDelete &&
            <span
              className={btnClose}
              onClick={(event) => { hashtagDelete({ hashtag, hashtagType }); event.stopPropagation() }}
              >
                <Close />
              </span>
            }
          </li>
        )
      }
      // TODO: what if long comment
    }

    export default ListHashtag
