import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


import {
  Tooltip,
} from '../../'

import {
  barTag,
  barTagInner,
  barNav,
  btn,
  pink,
  yellow,
  blue,
  purple,
  textFirstLine,
  textSecondLine,
} from './style'

import Cross from './cross'
import Plus from './plus'

const BarTagInner = ({ firstLine, secondLine }) => {
  return (
    <div className={barTagInner} >
      <div className={textFirstLine}>{ firstLine }</div>
      <div className={textSecondLine}>{ secondLine }</div>
    </div>
  )
}

const BarTag = ({
  empty,
  type,
  currentPostType,
  hashtag,
  hashtagAdd,
  onClearCurrentTypeHandler,
  isHashtagAlreadyAdded,
}) => {
  let color
  switch (currentPostType) {
    case 'QUESTION': {
      color = blue
      break
    }

    case 'REVIEW': {
      color = yellow
      break
    }

    case 'CLASS_NOTE': {
      color = purple
      break
    }

    default: {
      color = pink
    }
  }

  const onAddHashtag = () => {
    hashtagAdd({
      hashtags: [hashtag],
      tagType: 'Campus',
    })
  }


  const message = (tag) => {
    switch (currentPostType) {
      case 'QUESTION': {
        const firstLineMessage = hashtag ? `🤷‍ Ask a question about #${hashtag} on your campus` : '🤷‍ Ask a question about any #topic on your campus'
        const secondLineMessage = 'You’ll get answers from other students'

        return <BarTagInner
          firstLine={firstLineMessage}
          secondLine={secondLineMessage}
        />
      }

      case 'REVIEW': {
        const firstLineMessage = hashtag ? `😍  This is where you can share reviews about #${hashtag}` : 'This is where you can share reviews'
        const secondLineMessage =  hashtag ? `You can give 1 to 5 stars to #${hashtag} with a short description` : 'You can give 1 to 5 stars to any #topic with a short description'

        return <BarTagInner
          firstLine={firstLineMessage}
          secondLine={secondLineMessage}
        />
        break
      }

      case 'CLASS_NOTE': {
        const firstLineMessage = hashtag ? `🙏 Here you can share a document about #${hashtag}` : '🙏  Here you can share a document about any #topic'
        const secondLineMessage = 'Your campus will love you for sharing your notes'

        return <BarTagInner
          firstLine={firstLineMessage}
          secondLine={secondLineMessage}
        />
        break
      }

      default: {
        const firstLineMessage = '🙌  This is where everything is happening on campus'
        const secondLineMessage = hashtag ? `Make a first publication about #${hashtag}` : 'Make a publication with a #hashtag to get the conversation started'

        return <BarTagInner
          firstLine={firstLineMessage}
          secondLine={secondLineMessage}
        />
      }
    }

  }

  const classNames = [ barTag, color ]
  return (
    <div
      className={classNames.join(' ')}
      onClearCurrentTypeHandler={onClearCurrentTypeHandler}
    >
      { empty ? message(hashtag) : <span>#{hashtag}</span> }
      { hashtag &&
      <div className={barNav}>
        <Tooltip text="See all hashtags">
          <Link
            to={type ? `dashboard?type=${type}` : `dashboard`}
            className={btn}
          >
            <Cross />
          </Link>
        </Tooltip>
        {!isHashtagAlreadyAdded &&
          <Tooltip text="Add a new topic to your favorites">
            <span className={btn} onClick={() => onAddHashtag()}>
              <Plus />
            </span>
          </Tooltip>
        }
     </div>
     }
  </div>
  )
}

export default BarTag
