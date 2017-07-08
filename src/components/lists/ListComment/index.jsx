import React, { Component, PropTypes } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/lib/md'

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
  iconOpenMenu,
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
      action: () => { commentDelete({ commentId: id, postId }) }
    }]
  }

  render() {
    const {
      id,
      user,
      text,
      commentGiveDonuts,
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
            <ButtonDonut
              donutsCount={donutsCount}
              onClick={onClickButtonDonut}
            />
            {isOwnComment &&
             <span
              className={iconOpenMenu}
              onClick={() => { this.setState({ isDisplayDropDown: !this.state.isDisplayDropDown }) }}
             >
              <MdKeyboardArrowDown />
             </span>
            }
          </span>
        </span>
        { this.state.isDisplayDropDown &&
          <PanelDropDownMenu
            className={panelMenu}
            items={this.menuItems}
            isDisplay={this.state.isDisplayDropDown}
            closePanel={closePanel}
          /> }
      </li>
    )
  }
}


export default ListComment
