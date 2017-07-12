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
  ListChannel,
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

const uniq = (array, param) => {
  return array.filter((item, pos, array) => {
    return array.map((mapItem) => mapItem[param]).indexOf(item[param]) === pos
  })
}

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
      nextProps.locationParams !== this.props.locationParams ||
      nextProps.hashtags.length !== this.props.hashtags.length ||
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

  get uniqueHashtagsCurrentUser() {
    const { hashtagsCurrentUser } = this.props
    return hashtagsCurrentUser && uniq(hashtagsCurrentUser, 'hashtag')
  }

  get filteredHashtag() {
     const { keywordForSort } = this.state
     return this.uniqueHashtagsCurrentUser && this.uniqueHashtagsCurrentUser
     .filter(hashtag =>
       hashtag.hashtag.toLowerCase().includes(keywordForSort.toLowerCase())
     )
  }

  get isSearchResultForHashtagExist() {
    return this.filteredHashtag ? this.filteredHashtag.length > 0 : true
  }

  get filteredChannels () {
    const { keywordForSort } = this.state
    const { allChannels } = this.props
    return allChannels.filter(channel => channel.users.some(user => user.name.includes(keywordForSort)))
  }

  get isSearchResultForChannelExist() {
    return this.filteredChannels ? this.filteredChannels.length > 0 : true
  }

  get filteredTrendingHashtag() {
    const { keywordForSort } = this.state
    const { hashtagsTrending } = this.props
    return hashtagsTrending && hashtagsTrending.filter(hashtag => hashtag.toLowerCase().includes(keywordForSort))
  }

  get isSearchResultForTrendingHashtagExist() {
    return this.filteredTrendingHashtag ? this.filteredTrendingHashtag.length > 0 : true
  }

  get hasNoSearchResult () {
    return !this.isSearchResultForChannelExist &&
    !this.isSearchResultForHashtagExist &&
    !this.isSearchResultForTrendingHashtagExist
  }


  get resultHashtag() {
    const { keywordForSort } = this.state
    return this.hasNoSearchResult && (this.props.hashtags.length > 0 ? this.props.hashtags.filter(hashtag => hashtag.toLowerCase().includes(keywordForSort.toLowerCase())).map(hashtag =>
      <ListHashtag
        hashtag={hashtag}
        hashtagType={'s'}
        type={this.props.type}
        onClick={::this.clearInputSearchTag}
      />) : <ListHashtag
        hashtag={keywordForSort}
        hashtagType={'s'}
        type={this.props.type}
        onClick={::this.clearInputSearchTag}
      />)
  }

  clearInputSearchTag() {
    const self = this
    this.setState({ keywordForSort: '' }, () => { self._inputSearchTag.value = '' })
  }

  get resultChannel() {
    const { allChannels, currentUser, channelCreate } = this.props
    const self = this
    const onClickBtnMessage = (userId) => {
      const filteredChannel = allChannels.filter(channel => {
        const users = usersWithoutCurrentUser(channel.users, currentUser)
        // check if current user has channel with the other user
        // check channel is not group because it is supposed to be 1 to 1 chat
        // check if the other user id is included. [0] is the other user and [1] is current user
        return users.length === 1 && users[0].id == userId
      })

      const channel = filteredChannel[0]

      if (channel) {
        browserHistory.push(`/dashboard/channels/${channel.id}`)
      } else {
        channelCreate({ users: [userId] })
      }
      self.clearInputSearchTag()
    }
    const { keywordForSort } = this.state
    const { suggestionedUsers } = this.props

    return this.hasNoSearchResult && suggestionedUsers.filter(user => user.name.toLowerCase().includes(keywordForSort.toLowerCase())).map(user =>
      <li className={sectionTag} onClick={() => onClickBtnMessage(user.id)}><span data-user-online className={iconChannelOnlineStatus}><span className={iconOnline} /></span>{user.name}</li>
    )
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
      selectedHashtag,
      unReadChannelIds,
      contentReadCheckNotification,
      locationParams,
    } = this.props

    const unreadPostNotification = unreadNotification.filter(notification =>
      notification.type === "POST_HASHTAG" ||
      notification.type === "POST_MENTION" ||
      notification.type === "NEW_COMMENT"
    )


    const hashtagsNotification = unreadPostNotification.map(notification =>
      extractHashtagFromText(notification.post.text).map(tag => tag.match(/\w+/) && tag.match(/\w+/)[0])
    )

    const flattenHashtagsNotification = Array.prototype.concat.apply([], hashtagsNotification)

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


    /* Hashtag
     *
     */

    const ComponentsHashtag = this.filteredHashtag &&
      this.filteredHashtag
      .map((hashtag, index) => {
          const classNames = []
          // if (!this.state.isShowMoreTags && index > MAX_NUMBER_SHOW_ITEM) {
          //   classNames.push(hide)
          // }
          const isSelected = selectedHashtag ? selectedHashtag.toLowerCase() === hashtag.hashtag.toLowerCase() : false
          const isIncludeNewPost = flattenHashtagsNotification.map(hashtagNotification => hashtagNotification.toLowerCase()).includes(hashtag.hashtag.toLowerCase())
          const amountMention = mentionHashtagList[hashtag.hashtag]

          return (
            <ListHashtag
              className={classNames.join(' ')}
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


       /* Channel
        *
        *
        */

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

        const regexChannelPath = /\/dashboard\/channels\/[1-9]/
        const isChannel = regexChannelPath.test(window.location.href)

        const ComponentsChannel = allChannels &&
        this.filteredChannels.map((channel, index) => {
          let classNames = []
          // if (!this.state.isShowMoreChannels && index > MAX_NUMBER_SHOW_ITEM) {
          //   classNames.push(hide)
          // }
          let selectedChannelId
          if (isChannel && this.props.locationParams) {
            selectedChannelId = this.props.locationParams.channelId
          }
          const isSelected = (selectedChannelId && parseInt(channel.id) === parseInt(selectedChannelId))
          const amountNewMessage = messageNotification[channel.id]
          return (
            <ListChannel
              className={classNames.join(' ')}
              channel={channel}
              currentUser={currentUser}
              isSelected={isSelected}
              unReadChannelIds={unReadChannelIds}
              contentReadCheckNotification={contentReadCheckNotification}
              amountNewMessage={amountNewMessage}
            />
          )
        })


       /* Trending hashtag
        *
        *
        */

        const ComponentsTrendingHashtag = this.filteredTrendingHashtag.map((hashtag, index) => {
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
            {this.isSearchResultForHashtagExist &&
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
              { this.uniqueHashtagsCurrentUser && ComponentsHashtag }
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
          }

          {hashtagsTrending && this.isSearchResultForTrendingHashtagExist &&
            <ul className={section}>
              <h4 className={sectionLabel}>TRENDING TOPICS 👌</h4>
              {ComponentsTrendingHashtag}
            </ul>
          }

          {this.isSearchResultForChannelExist &&
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
        }

        {this.hasNoSearchResult &&
          <ul>
            <h4 className={sectionLabel}>
              Result
            </h4>
            {this.resultHashtag}
            {this.resultChannel}
          </ul>
         }
     </nav>
   )
}

render() {
  const { selectedHashtag, isMainDashboard, userSearch, hashtagSearch } = this.props
  const classNameForTopSchool = !selectedHashtag && isMainDashboard ? `${sectionTag} ${sectionTagHot} ${sectionTagHotActive}` : `${sectionTag} ${sectionTagHot}`

  const onChangeInputSearchTag = (event) => {
    if (this.hasNoSearchResult) {
      userSearch({ query: event.target.value })
      hashtagSearch({ query: event.target.value })
    }
    this.setState({ keywordForSort: event.target.value })
  }

  return (
    <div className={absolute}>
      <aside className={wrapper}>
        <div className={inner}>
          <InputSearchTag
            className={inputSearchTag}
            userSearch={userSearch}
            hashtagSearch={hashtagSearch}
            onChange={onChangeInputSearchTag}
            refTo={(ref) => this._inputSearchTag = ref}
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
