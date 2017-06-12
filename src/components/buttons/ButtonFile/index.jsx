import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {
  wrapper,
  button,
  buttonPrimary,
  buttonDanger,
  buttonOption,
  icon,
  info,
  fontFileName,
  fontFileSize,
} from './style'

import Zip from './svg/zip'
import Word from './svg/word'
import Excel from './svg/excel'
import Pdf from './svg/pdf'
import Powerpoint from './svg/powerpoint'
import Img from './svg/img'
import Other from './svg/other'
import storage from '../../../utils/localStorageHandler'

export function getClassNoteDownloadUrl(classNoteId) {
  const { accessToken } = storage
  const path = `/class_notes/${classNoteId}/download`
  const url = `https://api.uniyo.io/v1${path}?redirect=true&access_token=${accessToken}`
  return url
}


export default ({ id, fileName, fileSize, contentType }) => {
  let classNames = [button]
  let Icon
  switch (contentType) {

    case 'application/zip': {
      Icon = <Zip />
      break
    }

    case 'application/x-iwork-keynote-sffkey': {
      Icon = <Word />
      break
    }

    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      Icon = <Word />
      break
    }

    case 'application/msword': {
      Icon = <Word />
      break
    }

    case 'application/vnd.ms-powerpoint': {
      Icon = <Powerpoint />
      break
    }

    case 'application/vnd.ms-excel': {
      Icon = <Excel />
      break
    }

    case 'image/jpeg': {
      Icon = <Img />
      break
    }

    case 'image/png': {
      Icon = <Img />
      break
    }

    case 'image/gif': {
      Icon = <Img />
      break
    }

    case 'application/pdf': {
      Icon = <Pdf />
      break
    }

    default: {
      Icon = <Pdf />
      break
    }
  }
  const fileSizeFormatted = `${(fileSize / 1024 / 1024).toFixed(2)}MB`
  const className = classNames.join(" ")
  return (
    <Link className={wrapper} to={getClassNoteDownloadUrl(id)}>
      <div className={classNames}>
        <div className={icon}>{Icon}</div>
        <div className={info}>
          <p className={fontFileName}>{fileName}</p>
          <p className={fontFileSize}>{fileSizeFormatted} - Click to download</p>
        </div>
      </div>
    </Link>
  )
}
