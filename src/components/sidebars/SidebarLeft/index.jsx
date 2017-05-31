import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import {
  InputSearchTag,
  ListHashtag,
} from '../../'

import {
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
  iconOnline,
  userNames,
  tag,
  tagBtnClose,
  sectionTextAdd,
} from './style'

import Plus from './plus-active'

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
    const { allChannels, hashtagsCurrentUser, hashtagsTrending, hashtagDelete } = this.props

    const ListChannel = ({ className, channel }) => {
      const users = channel.users.length === 1 ? channel.users : channel.users.slice(0, channel.users.length - 1)
      return (
        <Link
          className={className}
          key={channel.id}
          to={`/dashboard/channels/${channel.id}`}
        >
          <li className={sectionTag}>
            {channel.users.length > 1 ?
              (<span data-amount-users={channel.users.length} className={iconChannel}>
                {channel.users.length}
              </span>) : (<span data-user-online className={iconChannelOnlineStatus}><span className={iconOnline} /></span>)
            }
            <span className={userNames}>{users.map(user => user.name.split(' ')[0]).join(', ')}</span>
          </li>
        </Link>
      )
    }

      const ComponentsHashtag = hashtagsCurrentUser &&
      Array.from(new Set(hashtagsCurrentUser)).filter(hashtag =>
        hashtag.hashtag.toLowerCase().includes(keywordForSort)).map((hashtag, index) => {
          const classNames = []
          if (!this.state.isShowMoreTags && index > MAX_NUMBER_SHOW_ITEM) {
            classNames.push(hide)
          }
          classNames.join(' ')
          return (
            <ListHashtag
              className={classNames}
              hashtag={hashtag.hashtag}
              hashtagType={hashtag.type}
              hashtagDelete={hashtagDelete}
              showBtnDelete
              type={this.props.type}
            />
          )
        })

        const ComponentsChannel = allChannels &&
        allChannels.filter(channel =>
          channel.users[0].name.toLowerCase().includes(keywordForSort)).map((channel, index) => {
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
            const classNames = []
            if (!this.state.isShowMoreTags && index > MAX_NUMBER_SHOW_ITEM) {
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
                hashtagsCurrentUser &&
                hashtagsCurrentUser.length > MAX_NUMBER_SHOW_ITEM &&
                <button
                  className={btnShowMore}
                  onClick={() => { this.setState({ isShowMoreTags: !this.state.isShowMoreTags }) }}
                  >
                    {this.state.isShowMoreTags ? 'Hide' : 'Show more'}
                  </button>
                }
                <h4
                  className={sectionTextAdd}
                  onClick={::this.onClickBtnAddHashTag}
                  >
                    <span>+ Add a new hashtag</span>
                  </h4>
                </ul>

                <ul className={section}>
                  <h4 className={sectionLabel}>TRENDING TOPIC</h4>
                  {hashtagsTrending && ComponentsTrendingHashtag}
                </ul>

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
              { keywordForSort === '' &&
              allChannels &&
              allChannels.length > MAX_NUMBER_SHOW_ITEM &&
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
            <h3 className={`${sectionTag} ${sectionTagHot}`}>
              <Link to="/dashboard/posts/top">All in EDHECBUSINES</Link>
            </h3>
          </ul>
          {this.navSideBar}
        </aside>
      )
    }
  }
