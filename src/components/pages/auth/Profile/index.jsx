import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import Dropzone from 'react-dropzone'
import Webcam from 'react-webcam'
import AvatarEditor from 'react-avatar-editor'

import IconPlus from './plus-active.svg'
import IconCross from './cross.svg'
import { storage } from '../../../../utils'
import IconBullet from './bullet.svg'
import IconBulletActive from './bullet-active.svg'

import {
  InputTextTransparent,
  InputHashtag,
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
  bottomPageNavBullets,
  header,
  square,
  spin,
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
  boxInput,
  iconPlus,
  iconPlusActive,
  tagBoxIcon,
  rangeSlider,
  boxInputRange,
} from './style.scss'

const calcRect = (imageSize, cropSize) => ({
  x: cropSize.x * imageSize.width,
  y: cropSize.y * imageSize.height,
  width: cropSize.width * imageSize.width,
  height: cropSize.height * imageSize.height,
})

export default class Profile extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    schools: PropTypes.isRequired,
  }

  state = {
    isInputFosActive: false,
    isInputClassActive: false,
    isWebcamOpen: false,
    screenshot: null,
    pageIndex: 0,
    imagePreview: null,
    reader: null,
    scaleImage: 1.2,
    form: {
      tagsFos: [],
      tagsClass: [],
      profileImage: {
        imageFile: null,
        cropInfo: {},
      },
    },
  }

  get classTagFromStringParams() {
    return this.props.location.query.class ? this.props.location.query.class.split(',') : []
  }

  componentDidMount() {
    if (!storage.hasValidAccessTokens) {
      browserHistory.push('/')
    }

    const self = this

    this.setState({
      ...this.state,
      reader: new FileReader(),
      form: {
        ...this.state.form,
        tagsClass: this.classTagFromStringParams,
      }
    }, () => {
      this.state.reader.addEventListener("load", function () {
        self.setState({
          ...this.state,
          imagePreview: self.state.reader.result
        })
      }, false)
    })
  }

  onClickBtnAddFos() {
    const value = this._inputFOS.value
    const regex = /^\s*$/

    if (regex.test(value)) return

    this.setState({
      form: {
        ...this.state.form,
        tagsFos: [...this.state.form.tagsFos, value],
      },
    })

    this._inputFOS.value = ''
  }

  onClickBtnAddClass() {
    const value = this._inputClass.value
    const regex = /^\s*$/

    if (regex.test(value)) return

    this._inputClass.value = ''

    this.setState({
      form: {
        ...this.state.form,
        tagsClass: [...this.state.form.tagsClass, value],
      },
    })
  }

  addFOSTag(value) {
    const regex = /^\s*$/
    const isExsist = Array.prototype.includes(this.state.form.tagsFos, value)
    if (isExsist || regex.test(value)) return

    this.setState({
      form: {
        ...this.state.form,
        tagsFos: [...this.state.form.tagsFos, value],
      },
    })
  }

  addClassTag(value) {
    const regex = /^\s*$/
    const isExsist = Array.prototype.includes(this.state.form.tagsClass, value)
    if (isExsist || regex.test(value)) return

    this.setState({
      form: {
        ...this.state.form,
        tagsClass: [...this.state.form.tagsClass, value],
      },
    })
  }

  onBack() {
    if (this.state.pageIndex === 0) return
    this.setState({
      form: {
        ...this.state.form,
        profileImage: {
          imageFile: null,
          cropInfo: {},
        },
      },
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
      hashtagAdd({ hashtags: this.state.form.tagsFos, tagType: 'FIELD_OF_STUDY' })
    }

    if (this.state.pageIndex === 1) {
      hashtagAdd({ hashtags: this.state.form.tagsClass, tagType: 'COURSE' })
    }

    if (this.state.pageIndex === 2) {
      if (this._img) {
        const imageSize = this._img.getBoundingClientRect()
        const cropSize = this._avatorEditor.getCroppingRect()
        const cropSizeRecalculated = calcRect(imageSize, cropSize)
        const image = Object.assign({}, {
          imageFile: this.state.form.profileImage.imageFile,
          cropInfo: cropSizeRecalculated,
          accessToken: localStorage['ACCESS_TOKEN'],
        })
        userPictureUpdate(image)
      } else {
        browserHistory.push('/dashboard')
      }
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
        ...this.state.form,
        tagsFos: updatedTagsFos,
      },
    })
  }

  onDeleteClassTag(tagClass) {
    const tagsClass = this.state.form.tagsClass
    const updatedTagsClass = tagsClass.filter(tag => tag !== tagClass)
    this.setState({
      form: {
        ...this.state.form,
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
    const { hashtags, hashtagSearch } = this.props
    const { all: allHashtag } = hashtags
    return (
      <div className={layoutFos}>
        <div className={header}>
          <h2 className={title}>What do you study?</h2>
        </div>
        <div className={content}>
          <div className={boxInput}>
            <InputHashtag
              onAdd={::this.addFOSTag}
              hashtags={allHashtag}
              hashtagSearch={hashtagSearch}
              placeholder={'Computer Science'}
            />
          </div>
          <ul className={contentTags}>
            {this.state.form.tagsFos && this.state.form.tagsFos.map(tagFos =>
              <li
                key={tagFos}
                className={tagOrange}
                onClick={event => ::this.onDeleteFosTag(tagFos)}
              >
               {tagFos}
               <span className={tagBoxIcon}><IconCross /></span>
              </li>)
            }
          </ul>
        </div>
        <div className={bottom}>
          <Button onClick={::this.onNext} type="primary">Continue</Button>
          <div className={bottomPageNav}>
            <span className={linkback} onClick={::this.onBack}>Back</span>
            <span className={bottomPageNavBullets}>
              <IconBulletActive />
              <IconBullet />
              <IconBullet />
            </span>
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
    const { hashtags, hashtagSearch } = this.props
    const { all: allHashtag } = hashtags
    return (
      <div className={layoutClasses}>
        <div className={header}>
          <h2 className={title}>What are your courses?</h2>
        </div>
        <div className={content}>
          <div className={boxInput}>
            <InputHashtag
              onAdd={::this.addClassTag}
              hashtags={allHashtag}
              hashtagSearch={hashtagSearch}
              placeholder={'CLASS001'}
            />
          </div>
          <ul className={contentTags}>
            {this.state.form.tagsClass
             && this.state.form.tagsClass.map(tagClass =>
               <li
                 key={tagClass}
                 className={tagGreen}
                 onClick={() => ::this.onDeleteClassTag(tagClass)}
               >
                {tagClass}
                <span className={tagBoxIcon}><IconCross /></span>
               </li>)}
          </ul>
        </div>

        <div className={bottom}>
          <Button onClick={::this.onNext} type="primary">Continue</Button>
          <div className={bottomPageNav}>
            <span className={linkback} onClick={::this.onBack}>Back</span>
            <span className={bottomPageNavBullets}>
              <IconBulletActive />
              <IconBulletActive />
              <IconBullet />
            </span>
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

  onDrop(files, rejectedFiles) {
    if (rejectedFiles.length > 0) {
      this.props.setUploadedImageTooLarge()
    }
    const file = files.filter(f => f)[0]
    this.setState({
      form: {
        ...this.state.form,
        profileImage: {
          imageFile: file,
        },
      },
    }, () => {
      this.imagePreview()
    })
  }

  imagePreview() {
    const image = this.state.form.profileImage.imageFile
    if (image) {
      this.state.reader.readAsDataURL(image)
    }
  }

  get renderThirdPage() {
    const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
    const MIME_TYPE = 'image/*'
    return (
      <div className={layoutProfilePicture}>
        { this.props.auth.isUploadingPicture &&
          <div className={modalProgress}>
            <div className={square}>
              <div className={spin}></div>
            </div>
            <h1>Uploading Image</h1>
          </div>
        }
        <div className={header}>
          <h2 className={title}>Last step. Your profile picture! 😙</h2>
        </div>

        <div className={content}>
          {this.state.form.profileImage && this.state.form.profileImage.imageFile ?
            <div>
              <img src={this.state.imagePreview} style={{ opacity: 0, position: 'absolute', zIndex: -1000 }} alt="profile_image" ref={(ref) => this._img = ref} />
              <AvatarEditor
                ref={(ref) => this._avatorEditor = ref}
                image={this.state.imagePreview}
                width={250}
                height={250}
                border={0}
                color={[234, 248, 255, 1]}
                scale={this.state.scaleImage}
                borderRadius={250}
             />
             <div className={boxInputRange}><input type="range" min="1" max="10" step="0.1" value={this.state.scaleImage} className={rangeSlider} onChange={(event) => { this.setState({ scaleImage: event.target.value }) }} /></div>
           </div> :
           <Dropzone
             className={dropZone}
             onDrop={::this.onDrop}
             multiple={false}
             maxSize={MAX_SIZE}
             accept={MIME_TYPE}
           >
            <div>
              <div>
                <h4 className={dropZoneTitle}>Drop the file or click here to find on your computer</h4>
              </div>
            </div>
          </Dropzone>
          }
          <ul className={contentSelect}>
            {/* <li className={contentSelectOptions}><Button type="option">Your Facebook picture</Button></li> */}
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
          {this.props.auth.error && this.props.auth.error.code === 'ApiErrorResponse.InvalidAccessTokenError' && <h3>Please login again.</h3>}
          <Button onClick={::this.onNext} type="primary">Get Started</Button>
          <div className={bottomPageNav}>
            <span className={linkback} onClick={::this.onBack}>Back</span>
            <span className={bottomPageNavBullets}>
              <IconBulletActive />
              <IconBulletActive />
              <IconBulletActive />
            </span>
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
