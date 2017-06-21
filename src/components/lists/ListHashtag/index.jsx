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

export default class ListHashtag extends Component {

  static propTypes = {
    className: PropTypes.string.isRequired,
    hashtag: PropTypes.string.isRequired,
    hashtagType: PropTypes.string.isRequired,
    showBtnDelete: PropTypes.bool.isRequired,
    hashtagDelete: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isIncludeNewPost: PropTypes.bool.isRequired,
    amountMention: PropTypes.number,
  }

  static defaultProps = {
    className: '',
    hashtag: '',
    hashtagType: '',
    isSelected: false,
    isIncludeNewPost: false,
  }

  render() {
    const {
      className,
      hashtag,
      hashtagType,
      showBtnDelete,
      hashtagDelete,
      isSelected,
      isIncludeNewPost,
      amountMention,
    } = this.props

    const wrapperClassNames = isSelected ? `${className} ${wrapper} ${wrapperActive}` : `${className} ${wrapper}`
    const classNameHashtag = isIncludeNewPost ? tagBold : tagRegular

    const onClickBtnHashtagDelete = (event) => {
      event.stopPropagation()
      event.preventDefault()
      hashtagDelete({ hashtag, hashtagType })
    }

    const link = isSelected ? '/dashboard' : dashboardPathGenarator({ hashtag })

    return (
      <Link
        key={hashCode(hashtag)}
        to={link}
      >
        <li className={wrapperClassNames}>
          <span className={tag}>
            <span className={classNameHashtag}>
              #{hashtag}
              { amountMention && <span className={iconNumberMention}>{amountMention}</span> }
            </span>
          </span>
          { showBtnDelete &&
            <span
              className={btnClose}
              onClick={onClickBtnHashtagDelete}
            >
              <Close />
            </span>
          }
        </li>
      </Link>
    )
  }
}
