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
      currentPage: 0,
    }
  }

  componentWillReceiveProps() {
    const { schoolsSearch, onSelectSchool, schools } = this.props
    const { data } = schools
    const slicedList = []
    var i,j,tempArray,chunk = 5;
    for (i = 0, j = data.length; i < j; i += chunk) {
      tempArray = array.slice(i,i+chunk);
      slicedList.push(tempArray)
    }
    this.setState({
      currentIndex: -1,
      currentPage: 0,
      source: data,
      slicedList: slicedList
    })
  }


  onKeyEventHandler(event) {
    const { schoolsSearch, onSelectSchool, schools } = this.props
    const { currentIndex } = this.state
    const dataLenght = schools.data.length

    if (event.key === DOWN) {
      this.setState({
        currentIndex: (currentIndex >= -1 && currentIndex < dataLenght - 1) ?
          currentIndex + 1 :
          currentIndex,
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
          onChange={event => schoolsSearch(event.target.value)}
          placeholder="Type your school name"
          onKeyDown={event => ::this.onKeyEventHandler(event)}
        />
        {data.length > 0 &&
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
          },
        )}
        </ul>
        }
      </div>
    )
  }
}
