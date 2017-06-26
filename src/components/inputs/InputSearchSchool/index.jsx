/* @flow */
import React, { Component, PropTypes } from 'react'

import {
  InputTextTransparent,
} from '../../'

import IconSearch from './search-icon'

import {
  containerSearchSchool,
  itemSchoolActive,
  listSchool,
  listWrapper,
  itemSchool,
  inputSearch,
  textCityName,
} from './style'

const DOWN = "ArrowDown"
const UP = "ArrowUp"
const ENTER = "Enter"

export default class InputSearchSchool extends Component {

  static propTypes = {
    schoolsSearch: PropTypes.func.isRequired,
    onSelectSchool: PropTypes.func.isRequired,
    schools: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static defaultTypes = {
    schools: [],
  }

  state = {
    currentIndex: -1,
    currentPage: 0,
  }

  onKeyDown(event) {
    const { schoolsSearch, onSelectSchool, schools } = this.props
    const { currentIndex } = this.state
    const dataLength = schools.data.length
    switch (event.key) {
      case DOWN: {
        const index = (currentIndex >= -1 && currentIndex < dataLength - 1) ? currentIndex + 1 : currentIndex
        this.setState({
          currentIndex: index,
        })
        if (currentIndex > 5) {
          this._schoolList.scrollTop += 35
        }
        break
      }

      case UP: {
        const index = (currentIndex > -1 && currentIndex <= dataLength - 1) ? currentIndex - 1 : currentIndex
        this.setState({
          currentIndex: index,
        })
        if (currentIndex > 5) {
          this._schoolList.scrollTop -= 35
        }
        break
      }

      case ENTER: {
        const { currentIndex } = this.state
        const { onSelectSchool, schools } = this.props
        const selectedSchool = schools.data[currentIndex]
        onSelectSchool(selectedSchool)
        break
      }
    }
  }

  render() {
    const { schoolsSearch, onSelectSchool, schools } = this.props
    const { data } = schools
    return (
      <div className={containerSearchSchool}>
        <InputTextTransparent
          onChange={event => schoolsSearch(event.target.value)}
          placeholder="Type your school name"
          onKeyDown={event => ::this.onKeyDown(event)}
          className={inputSearch}
          type="search"
        />

        {data.length > 0 &&
          <div className={listWrapper}>
            <ul className={listSchool} ref={element => this._schoolList = element}>
              {data.length > 0 && data.map((school, index) => {
                const classNames = index === this.state.currentIndex ? `${itemSchool} ${itemSchoolActive}` : itemSchool
                return (
                  <li
                    key={school.id}
                    className={classNames}
                    onClick={() => onSelectSchool(school)}
                  >
                    <span>{school.name}</span>
                    <span className={textCityName}>{school.cityName.toLowerCase()}</span>
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
