/* @flow */
import React, { Component, PropTypes } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import Dropzone from 'react-dropzone'
import { Picker } from 'emoji-mart'

import localStorage from '../../../utils/localStorageHandler'
import postTranspiler from '../../../utils/postTranspiler'
import $ from 'jquery'
import 'jquery.caret'
import 'style-loader!css-loader!at.js/dist/css/jquery.atwho.css'
import 'at.js'

import IconGif from './icon-gif'
import IconEmoji from './icon-emoji'
import IconPicture from './icon-picture'

import IconGifActive from './icon-gif-active'
import IconEmojiActive from './icon-emoji-active'
import IconPictureActive from './icon-picture-active'

import {
  TextPost,
  TextMention,
  ListMentionSuggestion,
  PanelGif,
  PanelEmoji,
  PanelPicturePost,
} from '../../'

import {
  wrapper,
  wrapperMain,
  wrapperPreview,
  wrapperImageBox,
  input,
  inputWrapper,
  icons,
  iconGif,
  iconGifActive,
  iconPicture,
  iconPictureActive,
  iconEmoji,
  iconEmojiActive,
  boxOptional,
  dropZone,
  dropZoneBox,
  dropZoneFilename,
  btnFileDelete,
  sectionMultiContent,
  sectionPreview,
  imgPreviewGif,
} from './style'

import { inputHandler } from '../../../utils'
const { placeCaretAtEnd } = inputHandler

const path = __PROD__ ? 'api.uniyo.io' : 'staging-api.uniyo.io'

export default class InputPost extends Component {

  static propTypes = {
    suggestionedUsers: PropTypes.array,
    currentPostType: PropTypes.string,
    currentHashTag: PropTypes.string,
    placeholder: PropTypes.string,
    imgUrl: PropTypes.string,
    hashtag: PropTypes.string,
    onClickUserImage: PropTypes.func.isRequired,
    onPostSubmit: PropTypes.func.isRequired,
  }

  state = {
    selectedGif: null,
    uploadedPicture: null,
    contentTab: -1,
    form: {
      rating: 5,
      file: null,
    },
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.suggestionedUsers !== this.props.suggestionedUsers ||
      nextProps.hashtag !== this.props.hashtag ||
      nextProps.placeholder !== this.props.placeholder ||
      nextProps.currentPostType !== this.props.currentPostType ||
      nextProps.currentHashTag !== this.props.currentHashTag ||
      nextProps.imgUrl !== this.props.imgUrl ||
      nextState !== this.state
    ) {
      return true
    }

    return false
  }

  componentDidMount() {
    // TODO: Move this or connect to redux
    if (!this.props.suggestionedUsers) {
      $('#input').atwho({
        at: '@',
        callbacks: {
          remoteFilter(query, callback) {
            const accessToken = localStorage.accessToken
            if (query) {
              $.ajax({
                url: `https://${path}/v1/users/search?query=${query}&access_token=${accessToken}`,
                type: 'GET',
                dataType: 'json',
                success(users) {
                // pull image
                  const mappedData = users.map(user => ({
                    id: user.id,
                    name: user.name,
                    image: user.image.small_url,
                  }))

                  callback(mappedData)
                },
                error() {
                  console.warn('Search is not working')
                },
              })
            }
          },
        },
        displayTpl: "<li class='atwho-list'><span class='atwho-list__inner'><img style='width: 30px; height: 30px; border-radius: 50%; margin-right: 5px;' src='${image}' /><span>${name}</span></span></li>",
        insertTpl: "<span onClick='void 0' data-user-id=${id}>@${name}</span>",
        searchKey: 'name',
      }).atwho({
        at: '#',
        callbacks: {
          remoteFilter(query, callback) {
            const accessToken = localStorage.accessToken
            if (query) {
              $.ajax({
                url: `https://${path}/v1/hashtags/search?query=${query}&access_token=${accessToken}`,
                type: 'GET',
                dataType: 'json',
                success(hashtags) {
                // pull image
                  const mappedData = hashtags.map(hashtag => ({
                    hashtag,
                  }))

                  callback(mappedData)
                },
                error() {
                  console.warn('Search is not working')
                },
              })
            }
          },
        },
        displayTpl: "<li style='display: flex; align-items: center; font-family: Roboto; padding: 5px 10px;'>${hashtag}</li>",
        insertTpl: "<span onClick='void 0' data-hashtag='true'>#${hashtag}</span>",
        searchKey: 'hashtag',
      })

      $('#input').on("inserted.atwho", function(event, flag, query) {
        event.stopImmediatePropagation()
        event.preventDefault()
      })
    }
  }

  componentWillReceiveProps() {
    if (
      this.props.allUsers &&
      this.props.allUsers.length > 0
    ) {
      const users = this.props.allUsers
      const mappedData = users.map(user => ({
        id: user.id,
        name: user.name,
        image: user.image.smallUrl,
      }))

      $('#input').atwho({
        at: '@',
        data: mappedData,
        displayTpl: "<li class='atwho-list' style='display: flex; align-items: center; font-family: Roboto; padding: 15px 25px;'><img style='width: 40px; height: 40px; border-radius: 50%; margin-right: 5px;' src='${image}' /> ${name}</li>",
        insertTpl: "<span onClick='void 0' data-user-id=${id}>@${name}</span>",
        searchKey: 'name',
      })

      $('#input').on("inserted.atwho", function(event, flag, query) {
        event.preventDefault()
        event.stopPropagation()
        return false
      })
    }
  }

  onDropFile(event) {
    const file = event[0]
    this.setState({
      form: {
        file,
      },
    })
  }

  onCopy(event) {
  }

  onPaste(event) {
    event.preventDefault()
    const content = (event.originalEvent || event).clipboardData.getData('text/plain')
    document.execCommand('insertText', false, content)
  }

  onFocus(event) {
    const { currentHashTag } = this.props
    this._input.innerHTML === '' && currentHashTag ? this._input.innerHTML = `#${currentHashTag} ` : ''
    placeCaretAtEnd(this._input)
  }

  onKeyDown(event) {
    if (event.keyCode === 13 && !event.isDefaultPrevented()) {
      if (!event.shiftKey) {
        event.preventDefault()
        this.onSubmit()
      }
    }
    window.scrollTo(0, window.scrollY)
  }

  onChange(event) {
    const search = "#"
    const searchRegex = /\#\w+/
  }

  onSubmit() {
    const { currentPostType, currentHashTag } = this.props
    const text = postTranspiler(this._input)
    const submit = (data) => {
      this.props.onPostSubmit(data)
    }

    let embeds = this.state.selectedGif ? {
      'embeds[0][text]': '',
      'embeds[0][type]': 'IMAGE',
      'embeds[0][url]': this.state.selectedGif,
      'embeds[0][color]': '',
      'embeds[0][border_left_color]': '',
    } : {}

    embeds = this.state.uploadedPicture ? {
      'embeds[0][text]': '',
      'embeds[0][type]': 'IMAGE',
      'embeds[0][file_data]': this.state.uploadedPicture,
      'embeds[0][file_name]': this.state.uploadedPicture.name,
      'embeds[0][content_type]': this.state.uploadedPicture.type,
    } : {}

    switch (currentPostType) {
      case 'ALL': {
        submit({
          postType: 'POST',
          embeds,
          text,
        })
        break
      }

      case 'REVIEW': {
        submit({
          postType: currentPostType,
          text,
          embeds,
          rating: this.state.form.rating,
        })
        break
      }

      case 'QUESTION': {
        submit({
          postType: currentPostType,
          text,
          embeds,
        })
        break
      }

      case 'CLASS_NOTE': {
        submit({
          postType: currentPostType,
          text,
          embeds,
          classNote: this.state.form.file,
        })
        break
      }

      case 'ANSWER': {
        const { questionId } = this.props
        submit({
          text,
          embeds,
          questionId,
        })
        break
      }

      case 'MESSAGE': {
        const { channelId } = this.props
        submit({
          text,
          channelId,
        })
        break
      }

      default: {
        console.warn('InputPost does not have correct post type')
      }
    }

    this.setState({
      form: {
        rating: 5,
        file: null,
      }
    })

    this._input.innerHTML = currentHashTag ? `#${currentHashTag} ` : ''
  }

  onStarClick(nextValue) {
    this.setState({
      form: {
        rating: nextValue,
      },
    })
  }

  get placeholder() {
    const { currentPostType, currentHashTag } = this.props
    let placeholder

    switch (currentPostType) {
      case 'ALL': {
        placeholder = currentHashTag ? `What's happening about #${currentHashTag}?` : "What's happening on campus?"
        break
      }

      case 'REVIEW': {
        placeholder = currentHashTag ? `What's your opinion on #${currentHashTag}?` : 'Share reviews about anything on campus'
        break
      }

      case 'QUESTION': {
        placeholder = currentHashTag ? `Ask your questions about #${currentHashTag}` : 'Ask questions, get answers'
        break
      }

      case 'CLASS_NOTE': {
        placeholder = currentHashTag ? `Share documents about #${currentHashTag}` : 'Share documents to get tons of donuts!'
        break
      }

      default: {
        placeholder = ''
      }
    }
    return placeholder
  }

  get BoxOptional() {
    let BoxOptional
    const { currentPostType } = this.props
    if (currentPostType === 'REVIEW') {
      BoxOptional = (
        <StarRatingComponent
          name={'Review'} /* name of the radio input, it is required */
          value={0} /* number of selected icon (`0` - none, `1` - first) */
          starCount={5} /* number of icons in rating, default `5` */
          starColor={'#FFDD00'} /* color of selected icons, default `#ffb400` */
          emptyStarColor={'#dcdcdc'} /* color of non-selected icons, default `#333` */
          onStarClick={::this.onStarClick}
          editing
        />)
    }

    if (currentPostType === 'CLASS_NOTE') {
      BoxOptional = (
        <Dropzone
          onDrop={::this.onDropFile}
          className={dropZone}
          multiple={false}
        >
          {!this.state.form.file ?
            <div className={dropZoneBox}>
              <h5>Drop a file to attach or click and browse to find a document.</h5>
            </div> :
            <div className={dropZoneBox}>
              <h4 className={dropZoneFilename}>{this.state.form.file.name}</h4>
              <h4>{`${(this.state.form.file.size / 1024 / 1024).toFixed(3)}MB`}</h4>
              <button className={btnFileDelete} onClick={(event) => {
                event.stopPropagation()
                this.setState({ form: { file: null } })
              }}></button>
            </div>
          }
        </Dropzone>
      )
    }
    return BoxOptional
  }

  onClickUserImage() {
    const { showUserInfo, currentUserId } = this.props
    showUserInfo(currentUserId)
  }

  onSelectGif(image) {
    const { url } = image.media[0].gif
    this.setState({
      contentTab: -1,
      selectedGif: url,
    })
  }

  onClearGif() {
    this.setState({
      contentTab: -1,
      selectedGif: null,
    })
  }

  onClearPicture() {
    this.setState({
      uploadedPicture: null,
    })
  }

  onClickEmoji(emoji, event) {
    event.stopPropagation()
    this._input.innerHTML = this._input.innerHTML + emoji.native
    this._input.focus()
  }

  onUploadedPicture(file) {
    this.setState({
      contentTab: -1,
      uploadedPicture: file,
    })
  }

  render() {
    const { imgUrl, hashtag, currentHashTag, currentPostType } = this.props
    const self = this
    const closePanel = () => { self.setState({ contentTab: -1 })}
    return (
      <span className={wrapper}>
        <div className={wrapperMain}>
          <span className={wrapperImageBox} onClick={::this.onClickUserImage}>
            <img src={imgUrl || 'loading'} />
          </span>
          {this.BoxOptional ? <span className={boxOptional}>{this.BoxOptional}</span> : null}
          <div className={inputWrapper}>
            <div
              id="input"
              className={input}
              contentEditable
              placeholder={this.props.placeholder || this.placeholder}
              ref={(input) => { this.props.refTo && this.props.refTo(input); this._input = input }}
              onChange={::this.onChange}
              onFocus={::this.onFocus}
              onCopy={::this.onCopy}
              onKeyDown={::this.onKeyDown}
              onPaste={::this.onPaste}
            />
            {currentPostType !== 'MESSAGE' &&
              <div className={icons}>
                {this.state.contentTab === 0 ? <div className={iconEmojiActive} onClick={() => this.setState({ contentTab: -1 })} /> : <div className={iconEmoji} onClick={() => this.setState({ contentTab: 0 })} /> }
                {this.state.contentTab === 1 ? <div className={iconPictureActive} onClick={() => this.setState({ contentTab: -1 })} /> : <div className={iconPicture} onClick={() => this.setState({ contentTab: 1 })} /> }
                {this.state.contentTab === 2 ? <div className={iconGifActive} onClick={() => this.setState({ contentTab: -1 })} /> : <div className={iconGif} onClick={() => this.setState({ contentTab: 2 })} /> }
              </div>
            }
            <div className={sectionMultiContent}>
              { this.state.contentTab === 0 &&
                <PanelEmoji
                  onClickEmoji={::this.onClickEmoji}
                  closePanel={closePanel}
                />
              }
              { this.state.contentTab === 1 &&
                <PanelPicturePost
                  onUploadedPicture={::this.onUploadedPicture}
                  closePanel={closePanel}
                />
              }
              { this.state.contentTab === 2 && <PanelGif onSelectGif={::this.onSelectGif} closePanel={closePanel} /> }
            </div>
          </div>
        </div>
        {this.state.selectedGif &&
          <div className={wrapperPreview}>
            <img src={this.state.selectedGif} className={imgPreviewGif} alt="" onClick={::this.onClearGif} />
          </div>
        }
        {this.state.uploadedPicture &&
          <div className={wrapperPreview}>
            <img src={this.state.uploadedPicture.preview} className={imgPreviewGif} alt="" onClick={::this.onClearPicture} />
          </div>
        }
      </span>
    )
  }
}
