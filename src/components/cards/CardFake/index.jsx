import React, { PureComponent , PropTypes } from 'react'
import moment from 'moment'
import { Link } from 'react-router'

import {
  TextPost,
  Donut,
  ListComment,
  InputComment,
  ButtonDonut,
} from '../../'

import {
  wrapper,
  wrapperLink,
  sectionImage,
  sectionContent,
  sectionContentHeader,
  sectionContentFotter,
  sectionContentUserName,
  sectionContentComment,
  sectionContentCommentForm,
  sectionContentCommentList,
  textUserName,
  textPostTime,
  btnLike,
  btnComment,
  show,
} from '../style'

export default class CardPost extends PureComponent  {

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

        </div>
        <div className={sectionContent}>
          <div className={sectionContentHeader}>
            <span className={textUserName}></span>
            {/* <span className={textPostTime}>{time}</span> */}
          </div>
          <div className={sectionContentFotter}>

          </div>
        </div>
      </div>
    )
  }
}
