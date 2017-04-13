import React, { Component, PropTypes } from 'react'

import {
  InputTextTransparent,
} from '../../'

import {
  containerSearchSchool,
  itemSchoolActive,
  listSchool,
  itemSchool,
} from './style'


const DOWN = "ArrowDown"
const UP = "ArrowUp"
const ENTER = "Enter"

export default class InputSearchSchool extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: -1,
    }
  }

  componentWillReceiveProps() {
    this.setState({
      currentIndex: -1
    })
  }


  onKeyEventhandler(event) {
    const { schoolsSearch, onSelectSchool, schools } = this.props
    const { currentIndex } = this.state
    const dataLenght = schools.data.length

    if (event.key === DOWN) {
      this.setState({
        currentIndex: (currentIndex >= -1 && currentIndex < dataLenght - 1) ?
          currentIndex + 1:
          currentIndex
      })
    }

    if (event.key === UP) {
      this.setState({
        currentIndex: (currentIndex > -1 && currentIndex <= dataLenght - 1) ?
          currentIndex - 1:
          currentIndex
      })
    }

    if (event.key === ENTER) {
      const { onSelectSchool, schools } = this.props
      const selectedSchool = schools.data[this.state.currentIndex]
      onSelectSchool(selectedSchool)
    }
  }

  render() {
    const { schoolsSearch, onSelectSchool, schools } = this.props
    const { data } = schools
    return (
      <div className={containerSearchSchool}>
        <InputTextTransparent
          onChange={schoolsSearch}
          placeholder="Type your school name"
          onKeyDown={event => ::this.onKeyEventhandler(event)}
        />
        <ul className={listSchool} >
          {data.length > 0 && data.map((school, index) => {
            const classNames = index === this.state.currentIndex ? `${itemSchool} ${itemSchoolActive}` : itemSchool
            return (
              <li
                key={school.id}
                className={classNames}
                onClick={() => onSelectSchool(school)}
              >
                {school.name}
              </li>
            )

            }
          )}
        </ul>
      </div>
    )
  }
}
