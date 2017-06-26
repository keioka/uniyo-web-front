import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import Dropzone from 'react-dropzone'
import Webcam from 'react-webcam'

import Cropper from 'cropperjs'
import '../../../../styles/vendor/cropperjs.css'

import Picture from './picture.svg'
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
  layoutSelectSchoolFotter,
  layoutSelectSchoolFotterLeft,
  layoutSelectSchoolFotterRight,
  header,
  title,
  tagOrange,
  tagGreen,
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
  modalWebcam,
  modalWebcamClose,
  modalProgress,
  buttonWebcam,
  progress,
  progressBar,
  progressShadow,
  modalProgressIconPicture,
} from './style'

export default class Profile extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    schools: PropTypes.isRequired,
  }

  state = {
    isWebcamOpen: false,
    screenshot: null,
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
      hashtagAdd({ hashtags: this.state.form.tagsFos, tagType: 'FIELD_OF_STUDY'})
    }

    if (this.state.pageIndex === 1) {
      hashtagAdd({ hashtags: this.state.form.tagsClass, tagType: 'COURSE'})
    }

    if (this.state.pageIndex === 2) {
      const image = Object.assign({},
        this.state.form.profileImage,
        {
          accessToken: localStorage['ACCESS_TOKEN'],
        },
      )
      userPictureUpdate(image)
      return
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

  onDeleteClassTag(tagClass) {
    const tagsClass = this.state.form.tagsClass
    const updatedTagsClass = tagsClass.filter(tag => tag !== tagClass)
    this.setState({
      form: {
        tagsClass: updatedTagsClass,
      },
    })
  }

  onClickActivateWebcamHandler(event) {
    event.stopPropagation()
    this.setState({
      isWebcamOpen: !this.state.isWebcamOpen,
    })
  }

  onClickTakePhotoHandler(event) {
    event.stopPropagation()
    const screenshot = this.refs.webcam.getScreenshot()
    this.setState({
      form: {
        ...this.state.form,
        profileImage: {
          ...this.state.form.profileImage,
          imageFile: {
            imageFile: screenshot,
            preview: screenshot,
          }
        }
      }
    }, () => {
      ::this.startCropping()
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
            {this.state.form.tagsFos && this.state.form.tagsFos.map(tagFos => <li key={tagFos} className={tagOrange} onClick={event => ::this.onDeleteFosTag(tagFos)}>{tagFos}</li>)}
          </ul>
        </div>
        <div className={bottom}>
          <Button onClick={::this.onNext} type="primary">Next</Button>
          <div className={bottomPageNav}>
            <span className={linkback} onClick={::this.onBack}>Back</span>
            <span className={bulletActive}></span>
            <span className={bulletNonActive}></span>
            <span className={bulletNonActive}></span>
            <span className={linkback} onClick={::this.onNext}>Next</span>
          </div>
        </div>
        <div className={layoutSelectSchoolFotter}>
          <img src="/public/assets/images/auth/donuts_left.svg" alt=""/>
          <img src="/public/assets/images/auth/donuts_right.svg" alt=""/>
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
            {this.state.form.tagsClass
             && this.state.form.tagsClass.map(tagClass => <li key={tagClass} className={tagGreen} onClick={() => ::this.onDeleteClassTag(tagClass)}>{tagClass}</li>)}
          </ul>
        </div>

        <div className={bottom}>
          <Button onClick={::this.onNext} type="primary">Next</Button>
          <div className={bottomPageNav}>
            <span className={linkback} onClick={::this.onBack}>Back</span>
            <span className={bulletActive}></span>
            <span className={bulletActive}></span>
            <span className={bulletNonActive}></span>
            <span className={linkback} onClick={::this.onNext}>Next</span>
          </div>
        </div>
        <div className={layoutSelectSchoolFotter}>
          <img src="/public/assets/images/auth/donuts_left.svg" alt=""/>
          <img src="/public/assets/images/auth/donuts_right.svg" alt=""/>
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
    })
  }

  get renderThirdPage() {
    const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
    const MIME_TYPE = 'image/*'
    return (
      <div className={layoutProfilePicture}>
        { this.props.auth.isUploadingPicture &&
          <div className={modalProgress}>
            <Picture className={modalProgressIconPicture} />
              <h1>Uploading Image</h1>
                <div className={progress}>
                <div className={progressBar}>
                  <div className={progressShadow}>
                  </div>
                </div>
              </div>
          </div>
        }
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
            <div>
              <div className="">
                <h4 className={dropZoneTitle}>Drop the file or click here to find on your computer</h4>
              </div>
            </div>
          </Dropzone>
          <ul className={contentSelect}>
            <li className={contentSelectOptions}><Button type="option">Your Facebook picture</Button></li>
            {/* <li className={contentSelectOptions}><Button type="option" onClick={(event) => ::this.onClickActivateWebcamHandler(event)} >Active your webcam</Button></li> */}
          </ul>
          { this.state.isWebcamOpen &&
            <div className={modalWebcam} onClick={(event) => ::this.onClickActivateWebcamHandler(event)}>
              { this.state.screenshot ? <img src={this.state.screenshot} /> : <Webcam ref='webcam' screenshotFormat="image/jpeg" />  }
              <button className={buttonWebcam} onClick={(event) => ::this.onClickTakePhotoHandler(event)}>Take a shot</button>
            </div>
          }
        </div>
        <div className={bottom}>
          <Button onClick={::this.onNext} type="primary">Submit</Button>
          <div className={bottomPageNav}>
            <span className={linkback} onClick={::this.onBack}>Back</span>
            <span className={bulletActive}></span>
            <span className={bulletActive}></span>
            <span className={bulletActive}></span>
            <span className={linkback}><Link to="/dashboard">Done</Link></span>
          </div>
      </div>
      <div className={layoutSelectSchoolFotter}>
        <img src="/public/assets/images/auth/donuts_left.svg" alt=""/>
        <img src="/public/assets/images/auth/donuts_right.svg" alt=""/>
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
