import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { actions } from 'uniyo-redux'

const mapStateToProps = state => {
  return {
    schools: state.schools,
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  schoolsSearch: actions.schoolsSearch,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Auth extends Component {

  static propTypes = {}

  render() {
    const { children, schools, schoolsSearch } = this.props
    const childComponents = React.Children.map(this.props.children, child => React.cloneElement(child, {
      schools,
      schoolsSearch,
    }))

    return (
      <div>
        <div>Auth</div>
        <div>{childComponents}</div>
      </div>
    )
  }
}
