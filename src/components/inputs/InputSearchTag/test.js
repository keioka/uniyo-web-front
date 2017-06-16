import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import InputSearchTag from './'

describe('<InputSearchTag />', () => {
  it('renders <InputSearchTag /> components', () => {
    const wrapper = shallow(<InputSearchTag />)
    expect(wrapper.find('input')).to.have.length(1)
  })
})
