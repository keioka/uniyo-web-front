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
  tag,
  tagBold,
  tagRegular,
  btnClose,
  iconNumberMention,
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
      isIncludeNewPost,
      amountMention,
    } = this.props
    const wrapperClassNames = isSelected ? `${className} ${wrapper} ${wrapperActive}` : `${className} ${wrapper}`

    return (
      <Link
        key={hashCode(hashtag)}
        to={dashboardPathGenarator({ hashtag })}
      >
        <li className={wrapperClassNames}>

          <span className={tag}>
            {isIncludeNewPost ?
              (<span className={tagBold}>#{hashtag} { amountMention && <span className={iconNumberMention}>{amountMention}</span> }</span>) :
              <span className={tagRegular}>#{hashtag} { amountMention && <span className={iconNumberMention}>{amountMention}</span> }</span>
            }
          </span>

          { showBtnDelete &&
            <span
              className={btnClose}
              onClick={(event) => {
                event.stopPropagation()
                event.preventDefault()
                hashtagDelete({ hashtag, hashtagType })
              }}
            >
              <Close />
            </span>
          }
        </li>
      </Link>
    )
  }
}

export default ListHashtag
