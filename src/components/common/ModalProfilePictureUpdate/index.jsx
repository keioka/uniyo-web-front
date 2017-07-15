import React, { Component, PureComponent, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'

import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'

import {
  Button,
  ButtonClose,
} from '../../'

import {
  wrapper,
  dropZone,
  dropZoneTitle,
  boxInputRange,
  rangeSlider,
  header,
  title,
  btn,
  boxCloseBtn,
} from './style'

const calcRect = (imageSize, cropSize) => ({
  x: cropSize.x * imageSize.width,
  y: cropSize.y * imageSize.height,
  width: cropSize.width * imageSize.width,
  height: cropSize.height * imageSize.height,
})

export default class ModalProfilePictureUpdate extends Component {

  state = {
    imagePreview: null,
    reader: null,
    scaleImage: 1.2,
    form: {
      profileImage: null
    }
  }

  componentDidMount() {
    const self = this

    this.setState({
      ...this.state,
      reader: new FileReader(),
    }, () => {
      this.state.reader.addEventListener("load", function () {
        self.setState({
          imagePreview: self.state.reader.result
        })
      }, false)
    })
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

  onSubmit() {
    const { userPictureUpdate, closeProfilePictureUpdate } = this.props
    const imageSize = this._img.getBoundingClientRect()
    const cropSize = this._avatorEditor.getCroppingRect()
    const cropSizeRecalculated = calcRect(imageSize, cropSize)
    const image = Object.assign({}, {
      imageFile: this.state.form.profileImage.imageFile,
      cropInfo: cropSizeRecalculated,
      accessToken: localStorage['ACCESS_TOKEN'],
    })
    userPictureUpdate(image)
    closeProfilePictureUpdate()
  }

  render() {
    const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
    const MIME_TYPE = 'image/*'
    const { closeProfilePictureUpdate } = this.props
    return (
      <div className={wrapper}>
        <div className={boxCloseBtn}>
          <ButtonClose onClick={closeProfilePictureUpdate} />
        </div>
        <div className={header}>
          <h2 className={title}>Change your profile picture! 😙</h2>
        </div>
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
        <Button type="primary" className={btn} onClick={::this.onSubmit}>Get Started</Button>
      </div>
    )
  }
}
