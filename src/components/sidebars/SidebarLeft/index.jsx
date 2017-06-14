import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'

import {
  postValue,
  decorator,
} from '../../../utils'

const {
  usersWithoutCurrentUser,
} = decorator

const {
  extractHashtagFromText,
} = postValue

import {
  InputSearchTag,
  ListHashtag,
} from '../../'

import {
  absolute,
  wrapper,
  section,
  sectionTag,
  sectionTagHot,
  sectionLabel,
  inputSearchTag,
  hide,
  btnShowMore,
  inputAddTag,
  iconChannel,
  iconChannelOnlineStatus,
  iconNumberNewMessage,
  iconOnline,
  userNames,
  tag,
  nav,
  tagBtnClose,
  sectionTextAdd,
  sectionTagHotActive,
  inner,
} from './style'

import Plus from './plus-active'

export default class SidebarLeft extends Component {

  state = {
    keywordForSort: '',
    isShowInputAddTag: false,
    isShowMoreTags: false,
    isShowMoreChannels: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.allChannels.length !== this.props.allChannels.length ||
      nextProps.unreadNotification.length !== this.props.unreadNotification.length ||
      nextProps.isSchoolTop !== this.props.isSchoolTop ||
      nextProps.selectedHashtag !== this.props.selectedHashtag ||
      nextProps.hashtagsCurrentUser !== this.props.hashtagsCurrentUser ||
      nextProps.isMainDashboard !== this.props.isMainDashboard ||
      nextState !== this.state
    ) {
      return true
    }

    return false
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

  onChangeInputSearchTag() {

  }

  get navSideBar() {
    const MAX_NUMBER_SHOW_ITEM = 4
    const { keywordForSort } = this.state
    const {
      allChannels,
      hashtagsCurrentUser,
      hashtagsTrending,
      hashtagDelete,
      unreadNotification,
      currentUser,
    } = this.props

    const unreadPostNotification = unreadNotification.filter(notification =>
      notification.type === "POST_HASHTAG" ||
      notification.type === "POST_MENTION" ||
      notification.type === "NEW_COMMENT"
    )

    const uniq = (array, param) => {
      return array.filter((item, pos, array) => {
        return array.map((mapItem) => mapItem[param]).indexOf(item[param]) === pos
      })
    }


    const uniqueHashtagsCurrentUser = hashtagsCurrentUser && uniq(hashtagsCurrentUser, 'hashtag')

    const hashtagsNotification = unreadPostNotification.map(notification =>
      extractHashtagFromText(notification.post.text).map(tag => tag.match(/\w+/) && tag.match(/\w+/)[0])
    )

    const flattenHashtags = Array.prototype.concat.apply([], hashtagsNotification)

    const unreadMentionNotification = unreadNotification.filter(notification =>
      notification.type === "POST_MENTION"
    )

    const mentionNotification = unreadMentionNotification.map(notification =>
      extractHashtagFromText(notification.post.text).map(tag => tag.match(/\w+/) && tag.match(/\w+/)[0])
    )

    const flattenMentions = Array.prototype.concat.apply([], mentionNotification)

    const mentionHashtagList = flattenMentions.length > 0 ? flattenMentions.reduce((allMentions, tag) => {
      if (tag in allMentions) {
        allMentions[tag]++
      } else {
        allMentions[tag] = 1
      }
      return allMentions
    }, {}) : {}

    const ListChannel = ({ className, channel, amountNewMessage }) => {
      const users = channel.users.length === 1 ? channel.users : channel.users.slice(0, channel.users.length - 1)
      return (
        <Link
          className={className}
          key={channel.id}
          to={`/dashboard/channels/${channel.id}`}
        >
          <li className={sectionTag}>
            {channel.users.length > 2 ?
              (<span data-amount-users={channel.users.length} className={iconChannel}>
                {channel.users.length - 1}
               </span>) : (<span data-user-online className={iconChannelOnlineStatus}><span className={iconOnline} /></span>)
            }
            <span className={userNames}>
              <span>{usersWithoutCurrentUser(users, currentUser).map(user => user.firstName).join(', ')}</span>
              {amountNewMessage > 0 && <span className={iconNumberNewMessage}>{amountNewMessage}</span>}
            </span>
          </li>
        </Link>
        )
      }

      const ComponentsHashtag = uniqueHashtagsCurrentUser &&
      uniqueHashtagsCurrentUser
      .filter(hashtag =>
        hashtag.hashtag.toLowerCase().includes(keywordForSort)
      )
      .map((hashtag, index) => {
          const classNames = []
          // if (!this.state.isShowMoreTags && index > MAX_NUMBER_SHOW_ITEM) {
          //   classNames.push(hide)
          // }
          const isSelected = this.props.selectedHashtag === hashtag.hashtag
          classNames.join(' ')
          const isIncludeNewPost = flattenHashtags.includes(hashtag.hashtag)
          const amountMention = mentionHashtagList[hashtag.hashtag]

          return (
            <ListHashtag
              className={classNames}
              hashtag={hashtag.hashtag}
              hashtagType={hashtag.type}
              hashtagDelete={hashtagDelete}
              isSelected={isSelected}
              isIncludeNewPost={isIncludeNewPost}
              amountMention={amountMention}
              showBtnDelete
              type={this.props.type}
            />
          )
        })

        const unreadMessageNotification = unreadNotification.filter(notification =>
          notification.type === "NEW_CHANNEL_MESSAGE"
        )

        const messageNotification = unreadMessageNotification.reduce((allNotifications, notification) => {
          const channelId = notification.channel.id
          if (channelId in allNotifications) {
            allNotifications[channelId]++
          } else {
            allNotifications[channelId] = 1
          }

          return allNotifications
        }, {})

        const ComponentsChannel = allChannels &&
        allChannels.filter(channel => channel.users[0].name.toLowerCase().includes(keywordForSort))
        .map((channel, index) => {
          let classNames = []
          // if (!this.state.isShowMoreChannels && index > MAX_NUMBER_SHOW_ITEM) {
          //   classNames.push(hide)
          // }
          const amountNewMessage = messageNotification[channel.id]
          return (
            <ListChannel
              className={classNames.join(' ')}
              channel={channel}
              amountNewMessage={amountNewMessage}
            />
          )
        })

        const ComponentsTrendingHashtag = hashtagsTrending && hashtagsTrending.filter(hashtag => hashtag.toLowerCase().includes(keywordForSort)).map((hashtag, index) => {
          const classNames = []
          // if (!this.state.isShowMoreTags && index > MAX_NUMBER_SHOW_ITEM) {
          //   classNames.push(hide)
          // }
          const isSelected = this.props.selectedHashtag === hashtag

          return (
            <ListHashtag
              className={classNames.join(' ')}
              hashtag={hashtag}
              isSelected={isSelected}
              type={this.props.type}
            />
          )
        })

        return (
          <nav className={nav}>
            <ul className={section}>
              <h4 className={sectionLabel} onClick={::this.onClickBtnAddHashTag}><span>Newsfeeds</span><Plus /></h4>
              { this.state.isShowInputAddTag &&
                <input
                  type="text"
                  placeholder="Follow a new hashtag..."
                  className={inputAddTag}
                  ref={(ref) => this._inputAddTag = ref}
                  onKeyUp={::this.onSubmitAddTag}
                  onKeyDown={event => { event.keyCode === 27 && this.setState({ isShowInputAddTag: false })}}
                />
              }
              { uniqueHashtagsCurrentUser && ComponentsHashtag }
              {/* { keywordForSort === '' &&
              hashtagsCurrentUser &&
              hashtagsCurrentUser.length > MAX_NUMBER_SHOW_ITEM &&
              <button
              className={btnShowMore}
              onClick={() => { this.setState({ isShowMoreTags: !this.state.isShowMoreTags }) }}
              >
              {this.state.isShowMoreTags ? 'Hide' : 'Show more'}
            </button>
          } */}
          {/* <h4
            className={sectionTextAdd}
            onClick={::this.onClickBtnAddHashTag}
            >
              <span>+ Add a new hashtag</span>
            </h4> */}
          </ul>

          {hashtagsTrending &&
            <ul className={section}>
              <h4 className={sectionLabel}>TRENDING TOPICS 👌</h4>
              {ComponentsTrendingHashtag}
            </ul>
          }

          <ul className={section}>
            <Link to='/dashboard/channels/new'>
              <h4 className={sectionLabel}>
                PRIVATE MESSAGES <Plus />
              </h4>
            </Link>
            {allChannels && ComponentsChannel}
            <Link to='/dashboard/channels/new'>
              <h4 className={sectionTextAdd}>
                <span>+ Start a new chat</span>
              </h4>
            </Link>
        {/* { keywordForSort === '' &&
        allChannels &&
        allChannels.length > MAX_NUMBER_SHOW_ITEM &&
        <button
        className={btnShowMore}
        onClick={() => { this.setState({ isShowMoreChannels: !this.state.isShowMoreChannels }) }}
        >
        {this.state.isShowMoreChannels ? 'Hide' : 'Show more'}
      </button>
      */}
    </ul>
  </nav>
)
}

render() {
  const { selectedHashtag, isMainDashboard } = this.props
  const classNameForTopSchool = !selectedHashtag && isMainDashboard ? `${sectionTag} ${sectionTagHot} ${sectionTagHotActive}` : `${sectionTag} ${sectionTagHot}`

  return (
  <div className={absolute}>
    <aside className={wrapper}>
      <div className={inner}>
        <InputSearchTag
          className={inputSearchTag}
          onChange={event => this.setState({ keywordForSort: event.target.value })}
        />
        <ul className={section}>
          <Link to="/dashboard">
            <h3 className={classNameForTopSchool}>
              All in {localStorage['SCHOOL_NAME']}
            </h3>
          </Link>
        </ul>
        {this.navSideBar}
      </div>
    </aside>
  </div>
  )
}
}
