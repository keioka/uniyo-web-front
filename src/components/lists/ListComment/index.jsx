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
} from './style'

class ListComment extends Component {

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

  get menuItems() {
    const { commentDelete, id, postId } = this.props
    return [{
      title: 'Delete',
      action: () => {  }
    }]
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
    const closePanel = () => { this.setState({ isDisplayDropDown: false }) }

    return (
      <li key={id} className={wrapper}>
        <span className={boxImage} onClick={onClickUserInfo}>
          <img src={image.smallUrl} className={imgUser} alt={name} />
        </span>
        <span className={content}>
          <span className={contentText}>
            <span className={fontName} onClick={onClickUserInfo}>{firstName}</span>
            <TextPost text={text} />
          </span>
          <span className={contentRight}>
            {isOwnComment &&
              <span
                className={iconDelete}
                onClick={() => { commentDelete({ commentId: id, postId }) }}
                >
                  <MdDeleteForever />
                </span>
              }
              <ButtonDonut
                donutsCount={donutsCount}
                onClick={onClickButtonDonut}
              />
            </span>
          </span>
        </li>
      )
    }
  }


  export default ListComment
