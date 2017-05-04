import React, { Component, PropTypes } from 'react'

const ListMentionSuggestion = (props) => {

  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    ...parentProps,
  } = props

  return (
    <div {...parentProps}>
      <div>
        <img
          src={mention.get('image').get('smallUrl')}
          role="user-image"
        />
      </div>
      <div>
        {mention.get('name')}
      </div>
    </div>
  )
}

export default ListMentionSuggestion
