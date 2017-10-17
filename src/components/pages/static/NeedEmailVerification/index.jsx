import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import {
  InputSearchSchool,
  InputTextTransparent,
  Button,
} from '../../../index'

import {
  layoutSelectSchool,
  layoutUserInfo,
  header,
  title,
  content,
  contentTitle,
  contentMain,
  contentFooter,
  layoutSelectSchoolFotter,
  layoutSelectSchoolFotterLeft,
  layoutSelectSchoolFotterRight,
  input,
  btn,
  text,
  nav,
  ul,
  active,
} from './style.scss'

const NeedEmailVerified = ({ resendVerificationEmail, auth }) => (
  <div className={layoutUserInfo}>
    <div className={header}>
      <nav className={nav}>
        <ul className={ul}>
          <li>
            <Link to={`/signin`}>Log in</Link>
          </li>
          <li>
            <Link to={`/signup`}>sign up</Link>
          </li>
        </ul>
      </nav>
    </div>
    <div className={content}>
      <h2 className={contentTitle}>👏 Need email verification</h2>
      <div className={contentMain}>
        You need to verify your email address at first
      </div>
      <div className={contentFooter}>
        {auth.isSuccessResendVerificationEmail && 'We sent email verification. Please check your email box.'}
        {!auth.isSuccessResendVerificationEmail && <Button type="primary" onClick={() => resendVerificationEmail()}>Resend email verification</Button>}
      </div>
    </div>

    <div className={layoutSelectSchoolFotter}>
      <img src="/public/assets/images/auth/donuts_left.svg" alt=""/>
      <img src="/public/assets/images/auth/donuts_right.svg" alt=""/>
    </div>
  </div>
)

export default NeedEmailVerified
