import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import InputSearch from './'

describe('<InputSearch />', () => {
  it('renders <InputSearch /> components', () => {
    const wrapper = shallow(<InputSearch />)
    expect(wrapper.find('input')).to.have.length(1)
  })
})
