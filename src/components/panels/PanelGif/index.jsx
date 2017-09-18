import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uiActions from '../../../redux/actions'

import {
  InputSearch,
  ButtonClose,
} from '../../'

import {
  element,
  list,
  elementActive,
  elementItem,
  barSearch,
  img,
  header,
} from './style'

// import Plus from './plus'

const mapStateToProps = state => ({
  imagesGif: state.ui.input.imagesGif,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGifImages: uiActions.fetchGifImages,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
class PanelGif extends Component {

  constructor() {
    super()
    this.onClickWindow = this.onClickWindow.bind(this)
  }

  componentDidMount() {
    const { fetchGifImages } = this.props
    fetchGifImages()
    const self = this
    document.getElementById("content").addEventListener('click', self.onClickWindow, false)
  }

  componentWillUnmount() {
    const self = this
    document.getElementById("content").removeEventListener('click', self.onClickWindow, false)
  }

  onClickWindow(event) {
    if (
      event.target.parentNode === this._panel ||
      event.target.parentNode.parentNode === this._panel ||
      event.target.parentNode.parentNode.parentNode === this._panel ||
      event.target.parentNode.parentNode.parentNode.parentNode === this._panel
    ) {
      return
    }
    this.props.closePanelGif()
  }

  onChangeInputSearchGif(event) {
    const { fetchGifImages } = this.props
    fetchGifImages({ query: event.target.value })
  }

  render() {
    return (
      <div className={element} ref={(ref) => this._panel = ref }>
        <div className={header}>
          <InputSearch refTo={(ref) => this._inputSearchGif = ref} placeholder="Search gif" onChange={::this.onChangeInputSearchGif} />
        </div>
        <ul className={list}>
          {this.props.imagesGif.map(image =>
             <img
               src={image.media[0].tinygif.url}
               alt="image_gif"
               className={img}
               onClick={() => this.props.onSelectGif(image)}
             />
          )}
        </ul>
      </div>
    )
  }
}

PanelGif.defaultProps = {
  type: 'success'
}

export default PanelGif
