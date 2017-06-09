import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store'

import {
  App,
  Auth,
  Dashboard
} from './containers'

import {
  Index,
  Signin,
  Signup,
  SelectSchool,
  Profile,
  FAQ,
  Privacy,
  Terms,
  InviteFriends,
  FOS,
  Picture,
  IndexDashboard,
  QuestionDashboard,
  ChannelDashboard,
  ChannelNewDashboard,
  PostShowDashboard,
  PostTopDashboard,
} from './components'

export default () => (
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/faq" component={FAQ} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/invite_friends" component={InviteFriends} />

      <Route component={Auth} >
        <Route path="/signin" component={SelectSchool} />
        <Route path="/signup" component={SelectSchool} />
        <Route path="/signout" component={SelectSchool} />
        <Route path="/profile_settings" component={Profile} />
      </Route>

      <Route path="/schools/:schoolSlug" component={Auth}>
        <Route path="/schools/:schoolSlug/signin" component={Signin} />
        <Route path="/schools/:schoolSlug/signup" component={Signup} />
        <Route path="/schools/:schoolSlug/email_verified" />
        <Route path="/schools/:schoolSlug/reset_password" />
        <Route path="/schools/:schoolSlug/reset_password/:token" />
      </Route>

      <Route path="/dashboard" component={Dashboard}>
        <IndexRoute component={IndexDashboard} />
        <Route path="/dashboard/channels/new" component={ChannelNewDashboard} />
        <Route path="/dashboard/channels/:channelId" component={ChannelDashboard} />
        <Route path="/dashboard/questions/:questionId" component={QuestionDashboard} />
        <Route path="/dashboard/notifications" />
        <Route path="/dashboard/posts/top" component={PostTopDashboard} />
        <Route path="/dashboard/posts/:postId" component={PostShowDashboard} />
      </Route>

      <Route path="/error/:errorCode" />


      <Route path="*" />
    </Route>
  </Router>
  </Provider>
)
