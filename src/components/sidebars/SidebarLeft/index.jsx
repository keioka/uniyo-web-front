import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  InputSearchTag,
} from '../../'

import {
  wrapper,
  section,
  sectionTag,
  sectionTagAll,
  sectionLabel,
  inputSearchTag,
  hide,
  btnShowMore,
} from './style'

const dashboardPathGenarator = ({ hashtag, type }) => {
  let path = 'dashboard'

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

function hashCode(str) {
  return str.split('').reduce((prevHash, currVal) =>
    ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
}

export default class SidebarLeft extends Component {

   state = {
     keywordForSort: '',
     //let this.props.hashtags = this.props.hashtags.filter(hashtag => hashtag.macth)
     isShowInputAddTag: false,
     isShowMoreTags: false,
     isShowMoreMessage: false,
   }

  onClickBtnAddHashTag() {
    this.setState({
      isShowInputAddTag: !this.state.isShowInputAddTag
    })
  }

  get navSideBar() {

    const { keywordForSort } = this.state
    const { allChannels, hashtags } = this.props

    const ListHashtag = ({ className, hashtag, type}) => (
      <Link
        className={className}
        key={hashCode(hashtag.hashtag)}
        to={dashboardPathGenarator({ hashtag: hashtag.hashtag, type: type })}
      >
        <li className={sectionTag}>
          #{hashtag.hashtag}
        </li>
      </Link>
    )

    const ListCannel = ({ className, channel }) => (
      <Link
        className={className}
        key={channel.id}
        to={`dasboard/channels/${channel.id}`}
      >
        <li className={sectionTag}>
          @{channel.users[0].name}
        </li>
      </Link>
    )

    const ComponentsHashtag = hashtags && hashtags.filter(hashtag => hashtag.hashtag.includes(keywordForSort)).map((hashtag, index) => {
      let classNames = []
      if (!this.state.isShowMoreTags && index > 9) {
        classNames.push(hide)
      }
      return (
        <ListHashtag className={classNames.join(' ')} hashtag={hashtag} type={this.props.type} />
      )
    })

    const ComponentsChannel = allChannels && allChannels.filter(channel => channel.users[0].name.includes(keywordForSort)).map((channel, index) => {
      let classNames = []
      if (!this.state.isShowMoreTags && index > 9) {
        classNames.push(hide)
      }
      return (
        <ListCannel className={classNames.join(' ')} channel={channel} />
      )
    })

    return (
      <nav>
        <ul className={section}>
          <h4 className={sectionLabel} onClick={::this.onClickBtnAddHashTag}>News Feed</h4>
          { this.state.isShowInputAddTag && <input type="text" /> }
          { hashtags && ComponentsHashtag }
          { keywordForSort === '' &&
            <button
              className={btnShowMore}
              onClick={() => { this.setState({ isShowMoreTags: !this.state.isShowMoreTags }) }}
            >
              {this.state.isShowMoreTags ? 'Hide' : 'Show more'}
            </button>
          }
        </ul>

        <ul className={section}>
          <h4 className={sectionLabel}>TRENDING TOPIC</h4>
        </ul>

        <ul className={section}>
          <h4 className={sectionLabel}>PRIVATE MESSAGES</h4>
          { allChannels && ComponentsChannel}
        </ul>
      </nav>
    )
  }

  render() {
    return (
      <aside className={wrapper} >
        <InputSearchTag className={inputSearchTag} onChange={event => this.setState({ keywordForSort: event.target.value })} />
        <ul className={section}>
          <h3 className={`${sectionTag} ${sectionTagAll}`} >All in EDHECBUSINES</h3>
        </ul>
        {this.navSideBar}
        <div>Signout</div>
      </aside>
    )
  }
}
