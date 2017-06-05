import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import Close from './close'

import {
  TextPost,
} from '../../'

import {
  wrapper,
  wrapperActive,
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

class ListHashtag extends Component {
  render() {
    const {
      className,
      hashtag,
      hashtagType,
      type,
      showBtnDelete,
      hashtagDelete,
      isSelected,
    } = this.props
    const wrapperClassNames = isSelected ? `${className} ${wrapper} ${wrapperActive}` : `${className} ${wrapper}`

    return (
      <li className={wrapperClassNames}>
        <Link
          key={hashCode(hashtag)}
          to={dashboardPathGenarator({ hashtag })}
        >
          <span>#{hashtag}</span>
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
}

export default ListHashtag