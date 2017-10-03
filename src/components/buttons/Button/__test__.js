import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import Button from './'

describe('<Button />', () => {
  describe('[render] <Button /> component', () => {
    it('should contains Hello', () => {
      const wrapper = shallow(<Button>Hello</Button>)
      expect(wrapper.contains('Hello')).to.equal(true)
    })
  })

  describe('[func] onClick()', () => {
    it('has onClick event', () => {
      const wrapper = shallow(<Button>Hello</Button>)
      const onClick = jest.genMockFunction()
      wrapper.setProps({ onClick: onClick })
      wrapper.find('button').simulate('click')
      expect(onClick).toBeCalled()
    })
  })
})
