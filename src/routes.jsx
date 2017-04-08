import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import {
  FAQ,
  Privacy,
  Terms,
  InviteFriends,
} from './components'

export default () => (
  <Router history={browserHistory}>
    <Route path="/" >

      <Route path="/faq" component={FAQ} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/invite_friends" component={InviteFriends} />

      <Route path="/:schoolSlug">
        <Route path="/:schoolSlug/signin" />
        <Route path="/:schoolSlug/signup" />
        <Route path="/:schoolSlug/email_verified" />
        <Route path="/:schoolSlug/reset_password" />
        <Route path="/:schoolSlug/reset_password/:token" />
      </Route>

      <Route path="/dashbord">
        <Route path="/dashboard/channels/new" />
        <Route path="/dashboard/channels/:channelId" />
        <Route path="/dashboard/questions/:questionId" />
        <Route path="/dashboard/notifications" />
        <Route path="/dashboard/posts/:postId" />
      </Route>

      <Route path="/select_fos" />
      <Route path="/select_course" />
      <Route path="/select_profile_picture" />

      <Route path="/error/:errorCode" />
      <Route path="*" />
    </Route>
  </Router>
)
