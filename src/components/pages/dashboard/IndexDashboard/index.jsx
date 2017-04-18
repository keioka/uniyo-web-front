import React, { Component, PropTypes } from 'react'

import {
  Button,
  CardPost,
} from '../../../index'


export default class IndexDashboard extends Component {
  render() {
    return (
      <div>
        {this.props.allPosts.map(post => <CardPost {...post} />)}
      </div>
    )
  }
}
