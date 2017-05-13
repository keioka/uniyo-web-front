import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import {
  header,
  headerSectionLogo,
  headerSectionNav,
  sectionTop,
  sectionTopContent,
  sectionPricing,
  sectionPricingContent,
  sectionPricingContentMain,
  main,
  nav,
  navUl,
  title,
  subTitle,
  imgProduct,
  btn,
  blockPrice,
  footer,
  footerColumn,
  footerLabel,
} from './style'

import {
  Button,
} from '../../../'

import Logo from './logo'
import imgProductPath from './product.png'

export default class Index extends Component {

  static propTypes = {}

  render() {
    return (
      <div>
        <div id="product" className={sectionTop}>
          <header className={header}>
            <div className={headerSectionLogo}>
              <Logo />
            </div>
            <div className={headerSectionNav}>
              <nav className={nav}>
                <ul className={navUl}>
                  {/* <li>download</li> */}
                  <li><a href="#product">product</a></li>
                  <li><a href="#pricing">pricing</a></li>
                  <li><Link to="/signin">signin</Link></li>
                  <li><Link to="/signup">signup</Link></li>
                </ul>
              </nav>
            </div>
          </header>
          <div className={sectionTopContent}>
            <h3 className={title}>Turn your campus into a playground.</h3>
            <h5 className={subTitle}>Playing together is better than competing against each other.</h5>
            <div className={main}>
              <Button type='primary' className={btn}>Join your campus</Button>
              <img src={imgProductPath} className={imgProduct} />
            </div>
          </div>
        </div>
        <div id="pricing" className={sectionPricing}>
          <div className={sectionPricingContent}>
            <h3 className={title}>Uniyo is 100% free for students</h3>
            <h5 className={subTitle}>We offer a seemless tool for students organisations to reach the whole campus and get students engaged.</h5>
            <div className={sectionPricingContentMain}>
              <div className={blockPrice}>
                <h5>Students</h5>
                <ul>
                  <li>help</li>
                  <li>be helped</li>
                  <li>give donuts</li>
                  <li>receive donuts</li>
                </ul>
                <h3>Free</h3>
              </div>
              <div className={blockPrice}>
                <h5>Student Organisation</h5>
                <ul>
                  <li>Annocement</li>
                </ul>
                <h3>$29/month</h3>
              </div>
            </div>
          </div>
        </div>
        <footer id="pricing" className={footer}>
          <div className={footerColumn}>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Medium</li>
              <li>Youtube</li>
            </ul>
          </div>

          <div className={footerColumn}>
            <ul>
              <li>Jobs</li>
              <li>Blog</li>
              <li>Press</li>
              <li>About</li>
            </ul>
          </div>

          <div className={footerColumn}>
            <ul>
              <li>Terms of Service</li>
              <li>Legacy</li>
              <li>Privacy</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div className={footerColumn}>
            <ul>
              <li>Download desktop app (comming soon)</li>
              <li>Download mobile app (comming soon)</li>
            </ul>
          </div>
        </footer>
        <div className={footerLabel}>Accelerated by in San Francisco</div>
      </div>
    )
  }
}
