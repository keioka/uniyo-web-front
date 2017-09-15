import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uiActions from '../../../redux/actions'

import {
  ButtonClose,
} from '../../'

import {
  element,
  list,
  elementActive,
  elementItem,
  barSearch,
  img,
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

  onClickWindow(event) {
    if (
      event.target.parentNode === this._panel ||
      event.target.parentNode.parentNode === this._panel ||
      event.target.parentNode.parentNode.parentNode === this._panel ||
      event.target.parentNode.parentNode.parentNode.parentNode === this._panel
    ) {
      return
    }
    this.props.closePanel()
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

  render() {
    return (
      <div className={element}>
        {/* <div className={barSearch}>
          <input type="text"/>
        </div> */}
        <ul className={list}>
          {this.props.imagesGif.map(image => {
            <p>hello</p>
          })}
          {/* <img src="https://media.tenor.co/images/bcc346dd645ef34c5eed0e22fe3196fe/tenor.gif" className={img} alt=""/>
          <img src="https://media.tenor.co/images/acaeae5ee4454eb497608baf393537b5/tenor.gif" className={img} alt=""/>
          <img src="https://media.tenor.co/images/a2c03c58c2a86927613b7347a775da64/tenor.gif" className={img} alt=""/>
          <img src="https://media.tenor.co/images/bcc346dd645ef34c5eed0e22fe3196fe/tenor.gif" className={img} alt=""/>
          <img src="https://media.tenor.co/images/bcc346dd645ef34c5eed0e22fe3196fe/tenor.gif" className={img} alt=""/>
          <img src="https://media.tenor.co/images/bcc346dd645ef34c5eed0e22fe3196fe/tenor.gif" className={img} alt=""/> */}
        </ul>
      </div>
    )
  }
}

PanelGif.defaultProps = {
  type: 'success'
}

export default PanelGif
