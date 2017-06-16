import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import InputPost from './'

describe('<InputPost />', () => {
  it('renders <InputPost /> components', () => {
    const wrapper = shallow(<InputPost />)
    expect(wrapper.find('div#input')).to.have.length(1)
  })
})
