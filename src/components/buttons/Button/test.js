import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import Button from './'

describe('<Button />', () => {
  it('renders <Button /> components', () => {
    const wrapper = shallow(<Button>Hello</Button>)
    expect(wrapper.contains('Hello')).to.equal(true)
  })

  it('has onClick event', () => {
    const wrapper = shallow(<Button>Hello</Button>)
    const onClick = sinon.spy()
    wrapper.setProps({ onClick: onClick })
    wrapper.find('button').simulate('click')
    expect(onClick).to.have.property('callCount', 1)
  })
})
