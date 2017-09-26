/* @flow */
import React, { PropTypes } from 'react'
import {
  wrapper,
  button,
  icon,
  info,
  fontFileName,
  fontFileSize,
} from './style.scss'

import Zip from './svg/zip.svg'
import Word from './svg/word.svg'
import Excel from './svg/excel.svg'
import Pdf from './svg/pdf.svg'
import Powerpoint from './svg/powerpoint.svg'
import Img from './svg/img.svg'
import Other from './svg/other.svg'
import storage from '../../../utils/localStorageHandler'

const getClassNoteDownloadUrl = (classNoteId:number) => {
  const { accessToken } = storage
  const path = __PROD__ ? 'api.uniyo.io' : 'staging-api.uniyo.io'
  return `https://${path}/v1/class_notes/${classNoteId}/download?redirect=true&access_token=${accessToken}`
}

const ButtonFile = ({ id, fileName, fileSize, contentType }) => {
  let classNames:Array<string> = [button]
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
      Icon = <Other />
      break
    }
  }
  const fileSizeFormatted:string = `${(fileSize / 1024 / 1024).toFixed(2)}MB`
  const className:string = classNames.join(" ")
  return (
    <a className={wrapper} href={getClassNoteDownloadUrl(id)} target="_blank">
      <div className={classNames}>
        <div className={icon}>{Icon}</div>
        <div className={info}>
          <p className={fontFileName}>{fileName}</p>
          <p className={fontFileSize}>{fileSizeFormatted} - Click to download</p>
        </div>
      </div>
    </a>
  )
}

export default ButtonFile
