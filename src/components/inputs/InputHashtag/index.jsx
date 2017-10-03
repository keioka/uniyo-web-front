/* @flow */
import React, { Component, PropTypes } from 'react'

import {
  InputTextTransparent,
} from '../../'

import IconPlus from './plus-active.svg'

import {
  container,
  item,
  itemActive,
  boxInput,
  input,
  listUl,
  listWrapper,
  inputSearch,
  textSchoolName,
  textCityName,
  iconPlusActive,
  iconPlus,
} from './style.scss'

const DOWN = "ArrowDown"
const UP = "ArrowUp"
const ENTER = "Enter"

export default class InputHashtag extends Component {

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    hashtagSearch: PropTypes.func.isRequired,
  }

  static defaultTypes = {

  }

  state = {
    currentIndex: -1,
    currentPage: 0,
    isInputActive: false,
    isShowList: false,
  }

  componentWillReceiveProps() {
    this.setState({
      isShowList: true,
      currentIndex: -1,
    })
  }

  clearInput() {
    this.setState({ isShowList: false, currentIndex: -1 })
    this.props.hashtagSearch({ query: '' })
    this._input.value = ''
  }

  activateInput(event) {
    this.setState({ isInputActive: event.target.value !== '' })
  }

  onClickBtn() {
    const { onAdd } = this.props
    onAdd(this._input.value)
    this.clearInput()
  }

  onChange(event) {
    const regex = /^\s*$/
    const value = this._input.value
    this.activateInput(event)
    this.props.hashtagSearch({ query: this._input.value })
  }

  onKeyDown(event) {
    const { hashtags } = this.props
    const { currentIndex } = this.state
    const dataLength = hashtags.length

    switch (event.key) {
      case DOWN: {
        if (dataLength === 0) return
        const index = (currentIndex >= -1 && currentIndex < dataLength - 1) ? currentIndex + 1 : currentIndex
        const currentElement = this._list.children[index]
        const elementTop = currentElement ? currentElement.getBoundingClientRect().top : 0
        const listTop = this._list.getBoundingClientRect().top

        this.setState({ currentIndex: index })
        if (elementTop > listTop) {
          this._list.scrollTop += 50
        }
        break
      }

      case UP: {
        if (dataLength === 0) return
        const index = (currentIndex > -1 && currentIndex <= dataLength - 1) ? currentIndex - 1 : currentIndex
        const currentElement = this._list.children[index]

        const elementTop = currentElement ? currentElement.getBoundingClientRect().top : 0
        const listTop = this._list.getBoundingClientRect().top

        this.setState({ currentIndex: index })

        if (elementTop > listTop) {
          this._list.scrollTop -= 50
        }
        break
      }

      case ENTER: {
        const { currentIndex } = this.state
        const { onAdd, hashtags } = this.props
        const value = this._input.value
        if (currentIndex === -1) {
          onAdd(value)
        } else {
          const hashtag = hashtags[currentIndex]
          onAdd(hashtag)
        }

        this.clearInput()

        break
      }
    }
  }

  onClickItem(hashtag) {
    const { onAdd } = this.props
    onAdd(hashtag)
    this.clearInput()
  }

  render() {
    const {
      hashtags,
      placeholder,
      hashtagSearch,
    } = this.props

    const isTextFieldActive = this.state.isInputActive

    return (
      <div className={container}>
        <div className={boxInput}>
          <InputTextTransparent
            className={input}
            onChange={::this.onChange}
            onKeyDown={::this.onKeyDown}
            refTo={(ref) => this._input = ref}
            placeholder={this.props.placeholder}
          />
          <IconPlus onClick={::this.onClickBtn} className={isTextFieldActive ? iconPlusActive : iconPlus} />
        </div>

        {hashtags.length > 0 && this.state.isShowList &&
          <div className={listWrapper}>
            <ul className={listUl} ref={element => this._list = element}>
              {hashtags.length > 0 && hashtags.map((hashtag, index) => {
                const classNames = index === this.state.currentIndex ? `${item} ${itemActive}` : item
                return (
                  <li
                    key={`Hashtag__${index}`}
                    className={classNames}
                    onClick={() => ::this.onClickItem(hashtag)}
                  >
                    <span className={textSchoolName}>{hashtag}</span>
                  </li>
                  )
                },
              )}
            </ul>
          </div>
        }
      </div>
    )
  }
}
