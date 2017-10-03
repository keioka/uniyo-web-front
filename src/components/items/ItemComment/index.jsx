import React, { Component, PropTypes } from 'react'
import { MdDeleteForever } from 'react-icons/lib/md'

import {
  TextPost,
  ButtonDonut,
  PanelDropDownMenu,
} from '../../'

import {
  boxImage,
  fontName,
  imgUser,
  wrapper,
  content,
  contentText,
  contentRight,
  panelMenu,
  iconDelete,
  btnDount,
} from './style.scss'

class ItemComment extends Component {

  state = {
    isDisplayDropDown: false,
  }

  propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    commentGiveDonuts: PropTypes.func.isRequired,
    donutsCount: PropTypes.number.isRequired,
    showUserInfo: PropTypes.func.isRequired,
  }

  render() {
    const {
      id,
      postId,
      user,
      text,
      commentGiveDonuts,
      commentDelete,
      donutsCount,
      showUserInfo,
      isOwnComment,
    } = this.props

    const { name, firstName, image } = user
    const onClickButtonDonut = () => commentGiveDonuts({ commentId: id, amount: 1 })
    const onClickUserInfo = () => showUserInfo(user.id)
    const onClickIconDelete = () => { commentDelete({ commentId: id, postId }) }
    const closePanel = () => { this.setState({ isDisplayDropDown: false }) }

    return (
      <li key={id} className={wrapper}>
        <div className={boxImage} onClick={onClickUserInfo}>
          <img src={image.smallUrl} className={imgUser} alt={name} />
        </div>
        <div className={content}>
          <div className={contentText}>
            <div className={fontName} onClick={onClickUserInfo}>{firstName}</div>
            <TextPost text={text} />
          </div>
          <div className={contentRight}>
            {isOwnComment &&
              <div
                className={iconDelete}
                onClick={onClickIconDelete}
                >
                  <MdDeleteForever />
                </div>
              }
              <ButtonDonut
                donutsCount={donutsCount}
                onClick={onClickButtonDonut}
              />
            </div>
          </div>
      </li>
    )
    }
  }

  export default ItemComment
