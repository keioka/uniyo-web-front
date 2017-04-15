import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import Dropzone from 'react-dropzone'
import Cropper from 'cropperjs'

import {
  InputSearchSchool,
  InputTextTransparent,
  Button,
} from '../../../index'

import {
  profileImage,
  boxProfileImage,
  layout,
  layoutFos,
  layoutClasses,
  layoutProfilePicture,
  header,
  title,
  tag,
  content,
  contentSelect,
  contentSelectOptions,
  contentTags,
  input,
  bottom,
  bottomPageNav,
  dropZone,
  bullet,
  bulletNonActive,
  bulletActive,
  linkback,
  dropZoneTitle,
} from './style'

export default class Profile extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    schools: PropTypes.isRequired
  }

  constructor() {
    super()
    this.state = {
      pageIndex: 0,
      form: {
        tagsFos: [],
        tagsClass: [],
        profileImage: {
          imageFile: null,
          cropInfo: {},
        },
      },
    }
  }

  componentDidMount() {
    console.log(this)
  }

  onKeyDownFOSHandler(event) {
    if (event.key === 'Enter') {
      const value = event.target.value
      event.target.value = ''

      const isExsist = Array.prototype.includes(this.state.form.tagsFos, value)

      if (isExsist) return

      this.setState({
        form: { ...this.state.form,
          tagsFos: [...this.state.form.tagsFos, value],
        },
      })
    }
  }


  onKeyDownClassesHandler(event) {
    if (event.key === 'Enter') {
      const value = event.target.value
      event.target.value = ''

      const isExsist = Array.prototype.includes(this.state.form.tagsFos, value)

      if (isExsist) return

      this.setState({
        form: {
          ...this.state.form,
          tagsClass: [...this.state.form.tagsClass, value],
        },
      })
    }
  }

  onBack() {
    if (this.state.pageIndex === 0) return
    this.setState({
      pageIndex: this.state.pageIndex - 1
    })
  }

  onNext() {
    if (this.state.pageIndex > 2) return

    const { hashtagAdd, userPictureUpdate } = this.props

    if (
      this.state.pageIndex === 0 &&
      this.state.form.tagsFos
    ) {
      hashtagAdd({ hashtags: this.state.form.tagsFos, tagType: 'FIELD_OF_STUDY', accessToken: localStorage['ACCESS_TOKEN'] })
    }

    if (this.state.pageIndex === 1) {
      hashtagAdd({ hashtags: this.state.form.tagsClass, tagType: 'COURSE', accessToken: localStorage['ACCESS_TOKEN']})
    }

    if (this.state.pageIndex === 2) {
      const image = Object.assign({},
        this.state.form.profileImage,
        {
          accessToken: localStorage['ACCESS_TOKEN'],
        },
      )
      userPictureUpdate(image)

      // Only if update is success
      // TODO: Move to middleware
      browserHistory.push('/dashboard')
    }

    this.setState({
      pageIndex: this.state.pageIndex + 1
    })
  }

  onDeleteFosTag(tagFos) {
    const tagsFos = this.state.form.tagsFos
    const updatedTagsFos = tagsFos.filter(tag => tag !== tagFos)
    this.setState({
      form: {
        tagsFos: updatedTagsFos,
      },
    })
  }

  onDeleteClassTag(tagClass){
    const tagsClass = this.state.form.tagsClass
    const updatedTagsClass = tagsClass.filter(tag => tag !== tagClass)
    this.setState({
      form: {
        tagsClass: updatedTagsClass,
      },
    })
  }

  get renderFirstPage() {
    return (
      <div className={layoutFos}>
        <div className={header}>
          <h2 className={title}>What do you study?</h2>
        </div>
        <div className={content}>
          <InputTextTransparent
            className={input}
            onKeyDown={::this.onKeyDownFOSHandler}
            placeholder="Type your field of study"
          />
          <ul className={contentTags}>
            {this.state.form.tagsFos && this.state.form.tagsFos.map(tagFos => <li key={tagFos} className={tag} onClick={event => ::this.onDeleteFosTag(tagFos)}>{tagFos}</li>)}
          </ul>
        </div>
        <div className={bottom}>
          <Button onClick={::this.onNext} type="primary">Next</Button>
          <div className={bottomPageNav}>
            <span className={bulletActive}></span>
            <span className={bulletNonActive}></span>
            <span className={bulletNonActive}></span>
          </div>
          <span className={linkback} onClick={::this.onBack}>Back</span>
        </div>
      </div>
    )
  }

  get renderSecondPage() {
    return (
      <div className={layoutClasses}>
        <div className={header}>
          <h2 className={title}>What are your courses?</h2>
        </div>
        <div className={content}>
          <InputTextTransparent
            className={input}
            onKeyDown={::this.onKeyDownClassesHandler}
            placeholder="Type your classes"
          />
          <ul className={contentTags}>
            {this.state.form.tagsClass && this.state.form.tagsClass.map(tagClass => <li key={tagClass} className={tag} onClick={() => ::this.onDeleteClassTag(tagClass)}>{tagClass}</li>)}
          </ul>
        </div>

        <div className={bottom}>
          <Button onClick={::this.onNext} type="primary">Next</Button>
          <div className={bottomPageNav}>
            <span className={bulletActive}></span>
            <span className={bulletActive}></span>
            <span className={bulletNonActive}></span>
          </div>
          <span className={linkback} onClick={::this.onBack}>Back</span>
        </div>
      </div>
    )
  }


  onDropHandle(files) {
    const file = files.filter(f => f)[0]
    this.setState({
      form: {
        ...this.form,
        profileImage: {
          imageFile: file,
        },
      },
    }, () => {
      ::this.startCropping()
    })
  }

  startCropping() {
    if (this._profileImage) {
      const cropedImage = new Cropper(this._profileImage, {
        aspectRatio: 1,
        crop: ::this.onCropHandle
      })
    }
  }

  onCropHandle(event) {
    this.setState({
      form: {
        ...this.state.form,
        profileImage: {
          ...this.state.form.profileImage,
          cropInfo: {
            x: event.detail.x,
            y: event.detail.y,
            width: event.detail.width,
            height: event.detail.height,
          }
        }
      }
    }, () => {
      console.log(this.state)
    })
  }

  get renderThirdPage() {
    const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
    const MIME_TYPE = 'image/*'
    return (
      <div className={layoutProfilePicture}>
        <div className={header}>
          <h2 className={title}>Last step. Your profile picture! 😙</h2>
        </div>
        <div className={content}>
          {this.state.form.profileImage.imageFile &&
            <div className={boxProfileImage}>
              <img className={profileImage} alt={this.state.form.profileImage.imageFile.name} ref={(img) => { this._profileImage = img }} src={this.state.form.profileImage.imageFile.preview} />
            </div>
          }
          <Dropzone
            className={dropZone}
            onDrop={::this.onDropHandle}
            multiple={false}
            maxSize={MAX_SIZE}
            accept={MIME_TYPE}
          >

            <div className={dropZone}>
              <div className="">

                <h4 className={dropZoneTitle}>Drop the file or click here to find on your computer</h4>
              </div>
            </div>
          </Dropzone>
          <ul className={contentSelect}>
            <li className={contentSelectOptions}><Button type="option">Your Facebook picture</Button></li>
            <li className={contentSelectOptions}><Button type="option">Active your webcam</Button></li>
          </ul>
        </div>
        <div className={bottom}>
          <Button onClick={::this.onNext} type="primary">Submit</Button>
          <div className={bottomPageNav}>
            <span className={bulletActive}></span>
            <span className={bulletActive}></span>
            <span className={bulletActive}></span>
          </div>
          <span className={linkback} onClick={::this.onBack}>Back</span>
        </div>
      </div>
    )
  }

  renderCarousel() {
    if (this.state.pageIndex === 0) {
      return this.renderFirstPage
    } else if (this.state.pageIndex === 1) {
      return this.renderSecondPage
    } else if (this.state.pageIndex === 2) {
      return this.renderThirdPage
    }
  }

  render() {
    return (
      <div className={layout}>
        {::this.renderCarousel()}
      </div>
    )
  }
}
