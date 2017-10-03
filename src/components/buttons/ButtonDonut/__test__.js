import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import ButtonDonuts from './'
import Donut from '../../'

describe('<ButtonDonuts />', () => {

  it('[render] <Donut /> components', () => {
    const wrapper = mount(<ButtonDonuts />)
    const wrapperSpan = wrapper.find('span')
    expect(wrapperSpan.contains(<Donut />)).to.have.length(1)
  })

  describe('[props:donutsCount]', () => {
    it('should have defaultProps: 0', () => {
      const wrapper = shallow(<ButtonDonuts />)
      expect(wrapper.instance().props.donutsCount).to.equal(0)
    })

    it('should have nextProps: 1000', () => {
      const wrapper = shallow(<ButtonDonuts />)
      wrapper.setProps({ donutsCount: 1000 })
      expect(wrapper.instance().props.donutsCount).to.equal(1000)
    })

    it('should be true shouldComponentUpdate()', () => {
      const wrapper = shallow(<ButtonDonuts donutsCount={1000} />, { lifecycleExperimental: true })
      const nextProps = { donutsCount: 1001 }
      const shouldUpdate = wrapper.instance().shouldComponentUpdate(nextProps)
      expect(shouldUpdate).to.equal(true)
    })
  })


  it('has onClick event', () => {
    const wrapper = shallow(<ButtonDonuts />)
    const event = {
      type: 'click',
      stopPropagation: () => {},
      preventDefault: () => {},
    }

    const onClick = sinon.spy(event)
    wrapper.setProps({ onClick: onClick })
    wrapper.find('button').simulate('click')
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
