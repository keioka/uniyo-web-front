import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {
  button,
  buttonPrimary,
  buttonDanger,
  buttonOption,
} from './style'

export default ({ fileName, fileSize, contentType }) => {
  let classNames = [button]
  switch (contentType) {
    case 'primary': {
      classNames.push(buttonPrimary)
      break
    }
    case 'danger': {
      classNames.push(buttonDanger)
      break
    }
    case 'option': {
      classNames.push(buttonOption)
      break
    }
    default: {
      break
    }
  }

  const className = classNames.join(" ")
  return (
    <Link to={""}>
      <div className={classNames}>
        <p>{fileName}</p>
        <p>{fileSize}</p>
      </div>
    </Link>
  )
}
