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

  componentDidMount() {
    if (typeof window.talkus === 'object') {
      window.talkus('init', 'mAuzzo8t2j9Bih5qy')
    }

    const anchorLinks = document.querySelectorAll('a[href*="#"]')
    anchorLinks.forEach((ele) => {
      ele.addEventListener('click', function onClick(event) {
        const elementYTop = document.getElementById(this.hash.match(/\w+/)).offsetTop
        event.preventDefault();
        var duration = 500;
        var startingY = window.pageYOffset
        var diff = elementYTop - startingY
        var start

        window.requestAnimationFrame(function step(timestamp) {
          if (!start) start = timestamp
          var time = timestamp - start
          var percent = Math.min(time / duration, 1)
          window.scrollTo(0, startingY + diff * percent)
          if (time < duration) {
            window.requestAnimationFrame(step)
          }
        })
      })
    })
  }

  onClick(event){
    event.preventDefault()
    window.talkus('open')
  }

  showDownloadBtn() {
    let btnText
    let url
    if (navigator.userAgent.match(/Android/i)){
      btnText = 'Android app is coming soon'
      url = ''
    } else if (
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i)
    ) {
      btnText = 'iOS app is coming soon'
      url = 'https://itunes.apple.com/us/app/uniyo-campus-communication-for-students/id1249873841?mt=8'
    } else {
      btnText = 'App is coming soon'
      url = 'https://itunes.apple.com/us/app/uniyo-campus-communication-for-students/id1249873841?mt=8'
    }

    return (
      <Link to={url}>
        <div className="home-btn-download home-btn">
          {btnText}
        </div>
      </Link>
    )
  }

  render() {
   return (
     <div className="home">
       <div className="home--top">
         <header className="home-header">
           <img src="/public/assets/images/home/logo.svg" alt=""/>
           <nav className="home-header-nav">
             <a href="https://itunes.apple.com/us/app/uniyo-campus-communication-for-students/id1249873841?mt=8" className="home-header-link">Download</a>
             {/*<a href="#download" className="home-header-link">Download</a>*/}
             {/* <a href="#pricing" className="home-header-link">Pricing</a>*/}
             <Link to="/signin" className="home-header-link">Log in</Link>
             <Link to="/signup" className="home-header-link home-signup">Sign up</Link>
           </nav>
         </header>
         <img src="/public/assets/images/home/Donnut.svg" alt="" className="home--top-donnut-mobile"/>
         <h1 className="home-title">The front-page of your campus</h1>
         <h3 className="home-subtitle">See what's happening on campus and connect with other students.</h3>
         <h3 className="home-subtitle-mobile">See what's happening on campus and connect with other students.</h3>
         <Link to="/signup" className="home-btn home-btn-join-campus">Join your campus</Link>
         <img src="/public/assets/images/home/Home_illustration.png" srcset="/public/assets/images/home/Home_illustration@2x.png 500w, /public/assets/images/home/Home_illustration@3x.png 1000w" className="home-img-screenshot" alt=""/>
         <img src="/public/assets/images/home/donuts_left.svg" className="home-img-donuts-left" alt=""/>
         <img src="/public/assets/images/home/donuts_right.svg" className="home-img-donuts-right" alt=""/>
         {this.showDownloadBtn()}
       </div>
       {/*
       <div id="download" className="home-mid-section home--desktop">
         <div className="home--desktop-left">
           <h2 className="home-section-title">Uniyo for Mac 👩‍💻</h2>
           <h4 className="home-section-subtitle">Get the most of the Uniyo experience and don’t miss anything about your campus.</h4>
           <span className="home-btn-icon">
             <span className="unable">
               <img src="/public/assets/images/home/mac_app_download.svg" alt="" />
             </span>
           </span>
         </div>
         <div className="home--desktop-right">
           <img src="/public/assets/images/home/Home_DesktopApp.png" alt="" className="home--desktop-right__image" />
         </div>
       </div>
       <div id="downloadapp" className="home-mid-section home--mobile">
         <div className="home--mobile-left">
           <img src="/public/assets/images/home/Home_iOS.png" alt="" className="home-img--iphone" />
           <img src="/public/assets/images/home/Home_Android.png" alt="" className="home-img--android" />
         </div>
         <div className="home--mobile-right">
           <h2 className="home-section-title">Your campus everywhere 🤳</h2>
           <h4 className="home-section-subtitle">Download your mobile app, stay in sync and make the most of your campus network.</h4>
           <div className="home-box-icons">
             <span className="home-btn-icon">
               <span className="unable">
                 <img src="/public/assets/images/home/app_download.svg" alt="" className="app-badge" />
               </span>
             </span>
             <span className="home-btn-icon">
               <span className="unable">
                 <img src="/public/assets/images/home/google-play-badge.png" alt="" className="app-badge" />
               </span>
             </span>
           </div>
         </div>
       </div>
       <div id="pricing" className="home-mid-section home--pricing">
         <div className="home--pricing-header">
           <h2 className="home-section-title">Uniyo is 100% free for students</h2>
           <h4 className="home-section-subtitle">We offer a seamless tool for students organizations to reach the entire campus and get students engaged. </h4>
         </div>
         <div className="home-section-card">
           <div className="home-card-price">
             <span className="home-card-price__emoji">😝</span>
             <table>
               <thead>
                 <tr>
                   <th>students</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td><span className="border"></span></td>
                 </tr>
                 <tr>
                   <td>Meet your campus</td>
                 </tr>
                 <tr>
                   <td>Be part of your campus life</td>
                 </tr>
                 <tr>
                   <td>Get answers to your questions</td>
                 </tr>
                 <tr>
                   <td>Eat donuts</td>
                 </tr>
               </tbody>
             </table>
             <span className="home-font-price">Free</span>
             <Link to="/signup" className="home-btn">Sign up</Link>
           </div>

           <div className="home-card-price">
             <span className="home-card-price__emoji">🏈</span>
             <table>
               <thead>
                 <tr>
                   <th>STUDENT ORGANIZATIONS</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td><span className="border"></span></td>
                 </tr>
                 <tr>
                   <td>Admin access</td>
                 </tr>
                 <tr>
                   <td>VERIFY ACADEMIC EMAIL</td>
                 </tr>
                 <tr>
                   <td>Get students engaged</td>
                 </tr>
                 <tr>
                   <td>Reach 100% of your campus</td>
                 </tr>
               </tbody>
             </table>
             <span className="home-font-price">
               <span>$25</span>
               <span className="home-font-label">/MONTH</span>
             </span>
             <span className="home-btn" onClick={::this.onClick}>More Info</span>
           </div>
         </div>
       </div>
       */}
       <div className="home-lineseparator"></div>
       <div className="home-footer-sitemap">
         <div className="home-footer-sitemap__nav">
           <h5>Popcorn  🍿</h5>
           <ul>
             <li><a href="https://www.facebook.com/uniyo.io">Facebook</a></li>
             <li><a href="https://www.linkedin.com/company-beta/11042866/">Linkedin</a></li>
             <li><a href="https://medium.com/uniyo">Medium</a></li>
             <li><a href="https://twitter.com/uniyo_io">Twitter</a></li>
           </ul>
         </div>

         <div className="home-footer-sitemap__nav">
           <h5>Chocolate  🍫</h5>
           <ul>
             <li><a href="https://uniyo.welcomekit.co/">Jobs</a></li>
             <li><a href="https://medium.com/uniyo">Blog</a></li>
             <li><a href="https://www.dropbox.com/sh/958ztm8az3fsui9/AAB0OlJ1xDxQ80Ls1Lj-k9-3a?dl=0">Press kit</a></li>
             <li><a href="https://medium.com/uniyo">About</a></li>
             {/*<li><a href="#pricing">Pricing</a></li>*/}
           </ul>
         </div>

         <div className="home-footer-sitemap__nav">
           <h5>Cookies 🍪</h5>
           <ul>
             <li><a href="https://uniyo.io/terms">Terms of service</a></li>
             <li><a href="https://uniyo.io/privacy">Privacy policy</a></li>
             <li><a href="https://medium.com/uniyo">FAQ</a></li>
             <li><Link onClick={::this.onClick}>Talk to our team</Link></li>
           </ul>
         </div>

         <div className="home-footer-sitemap__nav">
           <h5>Candies  🍬</h5>
           <ul>
             {/*<li><a href="#download">Download desktop app</a></li>
             <li><a href="#downloadapp">Download mobile app</a></li>*/}
             <li><a href="https://itunes.apple.com/us/app/uniyo-campus-communication-for-students/id1249873841?mt=8">Download mobile app</a></li>
           </ul>
         </div>

       </div>
       <div className="home-footer">
         <p>Accelerated by <a href="http://www.therefiners.co/"><img src="/public/assets/images/icon/Refiners.svg" align="middle" alt="The Refiners"/></a> in San Francisco</p>
       </div>
     </div>
   )
  }
}
