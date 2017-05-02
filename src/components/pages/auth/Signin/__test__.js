import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'

import Signin from './index'
import InputSearchSchool from '../../../'

const propsSchools = {
  form: {
    data:[]
  }
}

describe('<Signin />', () => {
  def('wrapper', function() {
    return  mount(
      <Signin
        schools={propsSchools}
        schoolsSearch={() => {}}
      />
    )
  })

  it('renders button components', () => {
    expect($wrapper.find('button')).to.have.length(1)
  })

  it('renders <InputSearchSchool /> components', () => {
    expect($wrapper.find('InputSearchSchool')).to.have.length(1)
  })
})
