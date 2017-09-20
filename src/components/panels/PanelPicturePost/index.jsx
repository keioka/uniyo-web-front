import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uiActions from '../../../redux/actions'
import Dropzone from 'react-dropzone'
import 'style-loader!css-loader!emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import IconPicture from './icon-picture'
import {
  wrapper,
  element,
  dropZone,
  dropZoneTitle,
  dropZoneIcon,
} from './style'

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const MIME_TYPE = 'image/*'

class PanelPicturePost extends Component {

  constructor() {
    super()
    this.onClickWindow = this.onClickWindow.bind(this)
  }

  componentDidMount() {
    const self = this
    document.getElementById("content").addEventListener('click', self.onClickWindow, false)
  }

  componentWillUnmount() {
    const self = this
    document.getElementById("content").removeEventListener('click', self.onClickWindow, false)
  }

  onDrop(file) {
    this.props.onUploadedPicture(file[0])
  }

  onClickWindow(event) {
    // event.stopPropagation()
    if (
      event.target.parentNode === this._panel ||
      event.target.parentNode.parentNode === this._panel ||
      event.target.parentNode.parentNode.parentNode === this._panel ||
      event.target.parentNode.parentNode.parentNode.parentNode === this._panel
    ) {
      return
    }
    // this.props.closePanel()
  }

  render() {
    return (
      <div className={wrapper}>
        <Dropzone
          className={dropZone}
          onDrop={::this.onDrop}
          multiple={false}
          maxSize={MAX_SIZE}
          accept={MIME_TYPE}
        >
          <IconPicture className={dropZoneIcon} />
          <h4 className={dropZoneTitle}>Drop the file or <br/> click here to find on your computer</h4>
        </Dropzone>
      </div>
    )
  }
}

export default PanelPicturePost
