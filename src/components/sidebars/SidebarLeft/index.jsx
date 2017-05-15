import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
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
  inputAddTag,
  iconChannel,
  iconChannelOnlineStatus,
  iconOnline,
  userNames,
} from './style'

import Plus from './plus-active'

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

function hashCode(str) {
  return str.split('').reduce((prevHash, currVal) =>
    ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
}

export default class SidebarLeft extends Component {

   state = {
     keywordForSort: '',
     isShowInputAddTag: false,
     isShowMoreTags: false,
     isShowMoreChannels: false,
   }

  onClickBtnAddHashTag() {
    this.setState({
      isShowInputAddTag: !this.state.isShowInputAddTag
    })
  }

  onSubmitAddTag(event) {
    if (event.key === 'Enter') {
      this.props.hashtagAdd({
        hashtags: [event.target.value],
        tagType: 'Campus',
      })
      browserHistory.push(`/dashboard?hashtag=${event.target.value}`)
      this._inputAddTag.value = ''

      this.setState({
        isShowInputAddTag: false,
      })
    }
  }

  get navSideBar() {

    const MAX_NUMBER_SHOW_ITEM = 4
    const { keywordForSort } = this.state
    const { allChannels, hashtagsCurrentUser, hashtagsTrending } = this.props

    const ListHashtag = ({ className, hashtag, type}) => (
      <Link
        className={className}
        key={hashCode(hashtag)}
        to={dashboardPathGenarator({ hashtag: hashtag, type: type })}
      >
        <li className={sectionTag}>
          #{hashtag}
        </li>
      </Link>
    )

    const ListChannel = ({ className, channel }) => (
      <Link
        className={className}
        key={channel.id}
        to={`/dashboard/channels/${channel.id}`}
      >
        <li className={sectionTag}>
          {channel.users.length > 1 ?
            (<span data-amount-users={channel.users.length} className={iconChannel}>
              {channel.users.length}
            </span>): (<span data-user-online={true} className={iconChannelOnlineStatus}><span className={iconOnline}></span></span>)
          }
          <span className={userNames}>{channel.users.map(user => user.name.split(" ")[0]).join(', ')}</span>
        </li>
      </Link>
    )

    const ComponentsHashtag = hashtagsCurrentUser && Array.from(new Set(hashtagsCurrentUser)).filter(hashtag => hashtag.hashtag.toLowerCase().includes(keywordForSort)).map((hashtag, index) => {
      let classNames = []
      if (!this.state.isShowMoreTags && index > MAX_NUMBER_SHOW_ITEM) {
        classNames.push(hide)
      }
      return (
        <ListHashtag
          className={classNames.join(' ')}
          hashtag={hashtag.hashtag}
          type={this.props.type}
        />
      )
    })

    const ComponentsChannel = allChannels && allChannels.filter(channel => channel.users[0].name.toLowerCase().includes(keywordForSort)).map((channel, index) => {
      let classNames = []
      if (!this.state.isShowMoreChannels && index > MAX_NUMBER_SHOW_ITEM) {
        classNames.push(hide)
      }
      return (
        <ListChannel
          className={classNames.join(' ')}
          channel={channel}
        />
      )
    })

    const ComponentsTrendingHashtag = hashtagsTrending && hashtagsTrending.filter(hashtag => hashtag.toLowerCase().includes(keywordForSort)).map((hashtag, index) => {
      let classNames = []
      if (!this.state.isShowMoreTags && index > 9) {
        classNames.push(hide)
      }
      return (
        <ListHashtag
          className={classNames.join(' ')}
          hashtag={hashtag}
          type={this.props.type}
        />
      )
    })

    return (
      <nav>
        <ul className={section}>
          <h4 className={sectionLabel} onClick={::this.onClickBtnAddHashTag}><span>News Feed</span><Plus /></h4>
          { this.state.isShowInputAddTag &&
            <input
              type="text"
              className={inputAddTag}
              ref={(ref) => this._inputAddTag = ref}
              onKeyUp={::this.onSubmitAddTag}
            />
          }
          { hashtagsCurrentUser && ComponentsHashtag }
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
          {hashtagsTrending && ComponentsTrendingHashtag}
        </ul>

        <ul className={section}>
          <Link to='/dashboard/channels/new'><h4 className={sectionLabel}>PRIVATE MESSAGES <Plus /></h4></Link>
          {allChannels && ComponentsChannel}
          { keywordForSort === '' &&
            <button
              className={btnShowMore}
              onClick={() => { this.setState({ isShowMoreChannels: !this.state.isShowMoreChannels }) }}
            >
              {this.state.isShowMoreChannels ? 'Hide' : 'Show more'}
            </button>
          }
        </ul>
      </nav>
    )
  }

  render() {
    return (
      <aside className={wrapper} >
        <InputSearchTag
          className={inputSearchTag}
          onChange={event => this.setState({ keywordForSort: event.target.value })}
        />
        <ul className={section}>
          <h3 className={`${sectionTag} ${sectionTagAll}`} >All in EDHECBUSINES</h3>
        </ul>
        {this.navSideBar}
      </aside>
    )
  }
}
