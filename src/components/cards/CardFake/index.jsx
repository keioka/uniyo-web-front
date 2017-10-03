import React, { PureComponent , PropTypes } from 'react'
import moment from 'moment'
import { Link } from 'react-router'

import {
  TextPost,
  Donut,
  ItemComment,
  InputComment,
  ButtonDonut,
} from '../../'

import {
  wrapper,
  wrapperLink,
  sectionImage,
  sectionContent,
  sectionContentHeader,
  sectionContentFooter,
  sectionFileDetail,
  sectionContentUserName,
  sectionContentComment,
  sectionContentCommentForm,
  sectionContentCommentList,
  footerSectionBtns,
  textUserName,
  textPostTime,
  textPostFake,
  btnLike,
  btnComment,
  btnFake,
  btnSmallFake,
  show,
  imageFake,
  textUserNameFake,
} from '../style.scss'

export default class CardFake extends PureComponent  {

  constructor() {
    super()
    this.state = {
      toggle: false,
    }
  }

  onClickCommentHandler(event) {
    const { commentsSearch, commentsCount, id } = this.props
    if (commentsCount > 0 && !this.state.toggle) {
      commentsSearch({ postId: id })
    }

    this.setState({
      toggle: !this.state.toggle,
    })
  }

  onClickDonutsHandler(event) {
    event.stopPropagation()
    const { postGiveDonuts, id } = this.props
    postGiveDonuts({ postId: id, amount: 1 })
  }

  render() {
    return (
      <div className={wrapper}>
        <div className={sectionImage}>
          <div className={imageFake}></div>
        </div>
        <div className={sectionContent}>
          <div className={sectionContentHeader}>
            <span className={textUserNameFake}></span>
          </div>
          <div>
            <span className={textPostFake}></span>
          </div>
          <div className={sectionContentFooter}>
            <div className={sectionFileDetail}>
            </div>
            <div className={footerSectionBtns}>
              <div className={btnFake}></div>
              <div className={btnSmallFake}></div>
            </div>
         </div>
      </div>
    </div>
    )
  }
}
