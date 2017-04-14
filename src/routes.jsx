import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import {
  App,
  Auth
} from './containers'

import {
  Index,
  Signin,
  Signup,
  Profile,
  FAQ,
  Privacy,
  Terms,
  InviteFriends,
  FOS,
  Picture,
} from './components'

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/faq" component={FAQ} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/invite_friends" component={InviteFriends} />

      <Route component={Auth} >
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile_settings" component={Profile} />
      </Route>

      <Route path="/:schoolSlug">
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

      <Route path="/error/:errorCode" />
      <Route path="*" />
    </Route>
  </Router>
)
