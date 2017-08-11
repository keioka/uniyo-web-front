import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import Close from './close'

import {
  TextPost,
  Tooltip,
} from '../../'

import {
  link,
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

export default class ItemHashtag extends Component {

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

  shouldComponentUpdate(nextProps) {
    if (
      this.props.isSelected !== nextProps.isSelected ||
      this.props.isIncludeNewPost !== nextProps.isIncludeNewPost ||
      this.props.amountMention !== nextProps.amountMention
    ) {
      return true
    }
    return false
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
      onClick,
    } = this.props

    const wrapperClassNames = isSelected ? `${className} ${wrapper} ${wrapperActive}` : `${className} ${wrapper}`
    const classNameHashtag = isIncludeNewPost ? tagBold : tagRegular

    const onClickBtnHashtagDelete = (event) => {
      event.stopPropagation()
      event.preventDefault()
      hashtagDelete({ hashtag, hashtagType })
    }

    const linkPath = isSelected ? '/dashboard' : dashboardPathGenarator({ hashtag })
    return (
      <Link
        onClick={onClick}
        to={linkPath}
        className={link}
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
                <Tooltip text="Unfollow" horizontal="right">
                  <Close />
                </Tooltip>
              </span>
          }
        </li>
      </Link>
    )
  }
}
