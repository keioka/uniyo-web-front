import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import ButtonDonuts from './'
import Donut from '../../index.js'

describe('<ButtonDonuts />', () => {
  it('renders <Donut /> components', () => {
    const wrapper = shallow(<ButtonDonuts />)
    expect(wrapper.find(<Donut />)).to.have.length(1)
  })

  it('has donutsCount 1000', () => {
    const wrapper = mount(<ButtonDonuts />)
    wrapper.setProps({ donutsCount: 1000 })
    expect(wrapper.props().donutsCount).to.equal(1000)
  })

  it('has onClick event', () => {
    const wrapper = shallow(<ButtonDonuts>Hello</ButtonDonuts>)
    const onClick = sinon.spy()
    wrapper.setProps({ onClick: onClick })
    wrapper.find('button').simulate('click', { preventDefault() {} })
    expect(onClick).to.have.property('type', 1)
  })
  //
  // it('renders an `.icon-star`', () => {
  //   const wrapper = shallow(<MyComponent />)
  //   expect(wrapper.find('.icon-star')).to.have.length(1)
  // })
  //
  // it('renders children when passed in', () => {
  //   const wrapper = shallow(
  //     <MyComponent>
  //       <div className="unique" />
  //     </MyComponent>
  //   )
  //   expect(wrapper.contains(<div className="unique" />)).to.equal(true)
  // })
  //
  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy()
  //   const wrapper = shallow(
  //     <Foo onButtonClick={onButtonClick} />
  //   )
  //   wrapper.find('button').simulate('click')
  //   expect(onButtonClick).to.have.property('callCount', 1)
  // })
})
