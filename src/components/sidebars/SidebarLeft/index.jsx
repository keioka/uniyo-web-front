import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import shallowCompare from 'react-addons-shallow-compare'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'uniyo-redux'
import uiActions from '../../../redux/actions'

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
  InputSearch,
  ItemHashtag,
  ItemChannel,
  Tooltip,
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
  iconOffline,
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

const mapStateToProps = state => ({
  currentUser: state.api.auth.currentUser,
  hashtagsCurrentUser: state.api.auth.currentUser.hashtags,
  allUsers: state.api.users.all,
  hashtags: state.api.hashtags.all,
  hashtagsTrending: state.api.hashtags.trending,
  allChannels: state.api.channels.all,
  allNotifications: state.api.notifications.all,
  unReadChannelIds: state.api.notifications.unReadChannelIds,
  unreadNotification: state.api.notifications.all.filter(notification => !notification.isRead),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  userSearch: actions.userSearch,
  hashtagAdd: actions.hashtagAdd,
  hashtagDelete: actions.hashtagDelete,
  hashtagSearch: actions.hashtagSearch,
  channelCreate: actions.channelCreate,
  contentReadCheckNotification: uiActions.contentReadCheckNotification,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
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
      shallowCompare(this, this.props.hashtagsCurrentUsers, nextProps.hashtagsCurrentUser) ||
      nextProps.allUsers.length !== this.props.allUsers.length ||
      shallowCompare(this, this.props.allUsers, nextProps.allUsers) ||
      nextState !== this.state
    ) {
      return true
    }

    return false
  }

  onClickBtnAddHashTag() {
    this.setState({
      isShowInputAddTag: !this.state.isShowInputAddTag,
    }, () => {
      if (this.state.isShowInputAddTag) {
        this._inputAddTag.focus()
      }
    })
  }

  onSubmitAddTag(event) {
    const regexEmpty = /^\s*$/
    if (event.key === 'Enter') {
      if (event.target.value === '#' || regexEmpty.test(event.target.value)) {
        return
      }

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

  filteredHashtag() {
    const { keywordForSort } = this.state
    return this.uniqueHashtagsCurrentUser && this.uniqueHashtagsCurrentUser
    .filter(hashtag =>
      hashtag.hashtag !== '' &&
      hashtag.hashtag.toLowerCase().includes(keywordForSort.toLowerCase())
    )
  }

  get isSearchResultForHashtagExist() {
    return this.filteredHashtag() ? this.filteredHashtag().length > 0 : true
  }

  get filteredChannels() {
    const { allUsers } = this.props
    const { keywordForSort } = this.state
    const { allChannels } = this.props
    return allChannels.filter(channel => channel.users.some(userId => {
      const user = allUsers.filter(user => user.id === userId)[0]
      if (user) {
        return user.name.includes(keywordForSort)
      }
      return false
    }))
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

  get hasNoSearchResult() {
    return !this.isSearchResultForChannelExist &&
    !this.isSearchResultForHashtagExist &&
    !this.isSearchResultForTrendingHashtagExist
  }

  renderResultHashtag() {
    const { keywordForSort } = this.state
    const hashtags = this.props.hashtags
    .filter(hashtag => hashtag.toLowerCase().includes(keywordForSort.toLowerCase()))
    return hashtags.length > 0 ?
     hashtags
     .map(hashtag =>
      <ItemHashtag
        key={`$item_hashtag_result__${hashtag}`}
        hashtag={hashtag}
        hashtagType={'s'}
        type={this.props.type}
        onClick={::this.clearInputSearchTag}
      />) :
      <ItemHashtag
        key={`$item_hashtag_result__${keywordForSort}`}
        hashtag={keywordForSort}
        hashtagType={'s'}
        type={this.props.type}
        onClick={::this.clearInputSearchTag}
      />
  }

  clearInputSearchTag() {
    const self = this
    this.setState({ keywordForSort: '' }, () => { self._inputSearchTag.value = '' })
  }

  get resultChannel() {
    const { allChannels, currentUser, channelCreate, allUsers } = this.props
    const self = this
    const onClickBtnMessage = (userId) => {
      const filteredChannel = allChannels.filter(channel => {
        const users = usersWithoutCurrentUser(channel.users.map(userId => allUsers.filter(user => user && user.id === userId)[0]), currentUser)
        // check if current user has channel with the other user
        // check channel is not group because it is supposed to be 1 to 1 chat
        // check if the other user id is included. [0] is the other user and [1] is current user
        return users.length === 1 && users[0].id === userId
      })

      const channel = filteredChannel[0]
      if (channel) {
        browserHistory.push(`/dashboard/channels/${channel.id}`)
      } else {
        channelCreate({ users: [userId] })
      }
      self.clearInputSearch()
    }
    const { keywordForSort } = this.state

    return allUsers.filter(user => user.name.toLowerCase().includes(keywordForSort.toLowerCase())).map(user =>
      <li className={sectionTag} onClick={() => onClickBtnMessage(user.id)}><span data-user-online className={iconChannelOnlineStatus}>{user.isOnline ? <span className={iconOnline} /> : <span className={iconOffline} />}</span> {user.name}</li>
    )
  }

  renderNavSideBar() {
    const MAX_NUMBER_SHOW_ITEM = 4
    const { keywordForSort } = this.state
    // const isValidSearch = keywordForSort.match()
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
      allUsers,
    } = this.props

    const unreadPostNotification = unreadNotification.filter(notification =>
      notification.type === 'POST_HASHTAG' ||
      notification.type === 'POST_MENTION' ||
      notification.type === 'NEW_COMMENT'
    )


    const hashtagsNotification = unreadPostNotification.map(notification =>
      extractHashtagFromText(notification.post.text).map(tag => tag.match(/\w+/) && tag.match(/\w+/)[0])
    )

    const flattenHashtagsNotification = Array.prototype.concat.apply([], hashtagsNotification)

    const unreadMentionNotification = unreadNotification.filter(notification =>
      notification.type === 'POST_MENTION' ||
      notification.type === 'NEW_COMMENT'
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

       /* Channel
        *
        *
        */

    const unreadMessageNotification = unreadNotification.filter(notification =>
          notification.type === 'NEW_CHANNEL_MESSAGE',
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
        this.filteredChannels.map((channel) => {
          const classNames = []
          // if (!this.state.isShowMoreChannels && index > MAX_NUMBER_SHOW_ITEM) {
          //   classNames.push(hide)
          // }
          let selectedChannelId
          if (isChannel && this.props.locationParams) {
            selectedChannelId = this.props.locationParams.channelId
          }
          const isSelected = (selectedChannelId && parseInt(channel.id) === parseInt(selectedChannelId))
          const amountNewMessage = messageNotification[channel.id]
          const users = channel.users.map(userId => {
            return allUsers.filter(user => user.id === userId)[0]
          })

          return (
            <ItemChannel
              className={classNames.join(' ')}
              users={users}
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
            <ItemHashtag
              key={`$item_hashtag_trending__${hashtag}`}
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
              <Tooltip text="Follow a new topic" horizontal="right">
                <h4 className={sectionLabel} onClick={::this.onClickBtnAddHashTag}>
                  <span>Newsfeeds</span>
                  <Plus />
                </h4>
              </Tooltip>
              { this.state.isShowInputAddTag &&
                <input
                  type="text"
                  placeholder="Follow a new hashtag..."
                  className={inputAddTag}
                  ref={ref => this._inputAddTag = ref}
                  onKeyUp={::this.onSubmitAddTag}
                  onKeyDown={(event) => { event.keyCode === 27 && this.setState({ isShowInputAddTag: false }) }}
                />
              }
              {this.filteredHashtag() && this.filteredHashtag().map(hashtag => {
                    const classNames = []
                    const isSelected = this.props.selectedHashtag ? this.props.selectedHashtag.toLowerCase() === hashtag.hashtag.toLowerCase() : false
                    const isIncludeNewPost = flattenHashtagsNotification.map(hashtagNotification => hashtagNotification.toLowerCase()).includes(hashtag.hashtag.toLowerCase())
                    const amountMention = mentionHashtagList[hashtag.hashtag]
                    const titleHashtag = hashtag.hashtag
                    const typeHashtag = hashtag.type
                    return (
                      <ItemHashtag
                        key={`$item_hashtag__${titleHashtag}`}
                        className={classNames.join(' ')}
                        hashtag={titleHashtag}
                        hashtagType={typeHashtag}
                        hashtagDelete={hashtagDelete}
                        isSelected={isSelected}
                        isIncludeNewPost={isIncludeNewPost}
                        amountMention={amountMention}
                        showBtnDelete
                        type={this.props.type}
                      />
                    )
              })}

            </ul>
          }

          {hashtagsTrending && this.isSearchResultForTrendingHashtagExist &&
            <ul className={section}>
              <h4 className={sectionLabel}>TRENDING TOPICS 👌</h4>
              {ComponentsTrendingHashtag}
            </ul>
          }

          {keywordForSort !== '' && this.renderResultHashtag() &&
            <ul className={section}>
              <h4 className={sectionLabel}>
                OTHER HASHTAGS
              </h4>
              <ul>
                {this.renderResultHashtag()}
              </ul>
            </ul>
          }

          {this.isSearchResultForChannelExist &&
          <ul className={section}>
            <Tooltip text="Start a new conversation" horizontal="right">
              <Link to='/dashboard/channels/new'>
                <h4 className={sectionLabel}>
                  PRIVATE MESSAGES <Plus />
                </h4>
              </Link>
            </Tooltip>
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

        {keywordForSort !== '' && this.resultChannel.length > 0 &&
          <ul className={section}>
            <h4 className={sectionLabel}>
              Directory 😛
            </h4>
            <ul>
              {this.resultChannel}
            </ul>
          </ul>
        }
          </nav>
        )
  }

render() {
  const { selectedHashtag, isMainDashboard, userSearch, hashtagSearch } = this.props
  const classNameForTopSchool = !selectedHashtag && isMainDashboard ? `${sectionTag} ${sectionTagHot} ${sectionTagHotActive}` : `${sectionTag} ${sectionTagHot}`
  const navSideBar = this.renderNavSideBar()
  const onChangeInputSearchTag = (event) => {
    const { value } = event.target
    const regexEmpty = /^\s+$/
    const inValidSearch = value && value.match(/\$|\^|\&|\*|\(|\)|\-|\+|\=/) && value.match(/\w+/)[0]
    const keyword = value && value.match(/\w+/) && value.match(/\w+/)[0]
    if (!regexEmpty.test(value)) {
      userSearch({ query: keyword })
      hashtagSearch({ query: keyword })
    }
    this.setState({ keywordForSort: keyword, inValidSearch: inValidSearch })
  }

  return (
    <div className={absolute}>
      <aside className={wrapper}>
        <div className={inner}>
          <InputSearch
            className={inputSearchTag}
            placeholder="Browse your campus"
            userSearch={userSearch}
            hashtagSearch={hashtagSearch}
            onChange={onChangeInputSearchTag}
            refTo={ref => this._inputSearchTag = ref}
          />
          <ul className={section}>
            <Link to="/dashboard">
              <h3 className={classNameForTopSchool}>
                All in {localStorage.SCHOOL_NAME}
              </h3>
            </Link>
          </ul>
         {this.state.inValidSearch ?
         <h4 className={sectionLabel}>
           No search result 😫
         </h4>
         : navSideBar}
        </div>
      </aside>
    </div>
  )
}
}

class ListHashtags extends Component {

  // shouldComponentUpdate(nextProps) {
  //   // if (
  //   //   this.props.filteredHashtag.length !== nextProps.filteredHashtag.length ||
  //   //   this.props.selectedHashtag !== nextProps.selectedHashtag ||
  //   //   this.props.mentionHashtagList !== nextProps.mentionHashtagList ||
  //   //   this.props.flattenHashtagsNotification.length !== nextProps.flattenHashtagsNotification.length ||
  //   //   shallowCompare(this, this.props.filteredHashtag, nextProps.filteredHashtag)
  //   // ) {
  //   //   return true
  //   // }
  //   return true
  // }

  render() {
    const { filteredHashtag, selectedHashtag, mentionHashtagList, flattenHashtagsNotification, hashtagDelete } = this.props
    return (
      <ul>
      {filteredHashtag && filteredHashtag.map(hashtag => {
          const classNames = []
          const isSelected = selectedHashtag ? selectedHashtag.toLowerCase() === hashtag.hashtag.toLowerCase() : false
          const isIncludeNewPost = flattenHashtagsNotification.map(hashtagNotification => hashtagNotification.toLowerCase()).includes(hashtag.hashtag.toLowerCase())
          const amountMention = mentionHashtagList[hashtag.hashtag]
          const titleHashtag = hashtag.hashtag
          const typeHashtag = hashtag.type
          return (
            <ItemHashtag
              className={classNames.join(' ')}
              hashtag={titleHashtag}
              hashtagType={typeHashtag}
              hashtagDelete={hashtagDelete}
              isSelected={isSelected}
              isIncludeNewPost={isIncludeNewPost}
              amountMention={amountMention}
              showBtnDelete
              type={this.props.type}
            />
          )
        })}
      </ul>
    )
  }
}
