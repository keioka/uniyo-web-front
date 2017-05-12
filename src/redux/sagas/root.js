import sagas from './index'
import { fork } from 'redux-saga/effects'

const {
  schoolsSearchSaga,
  logInSaga,
  userCreateSaga,
  tokenRefreshSaga,
  addUserTagsSaga,
  updateUserProfilePicSaga,
  postsSearchSaga,
  postCreateSaga,
  commentsSearchSaga,
  commentCreateSaga,
  userInfoSaga,
  userSearchSaga,
  currentUserSaga,
  watchShowUserInfo,
  watchShowChannelUsers,
  messageSearchSaga,
  messageCreateSaga,
  channelSearchSaga,
  channelCreateSaga,
  hashtagTrendingSearchSaga,
  postInfoSaga,
  answerSearchSaga,
  answerCreateSaga,
  notificationSearchSaga,
  notificationReadMarkSaga,
  webSocket,
  watchMarkNotificationAsRead,
} = sagas

export default function* rootSaga() {
  yield [
    /*
      saga for api
    */
    fork(schoolsSearchSaga),
    fork(logInSaga),
    fork(userCreateSaga),
    fork(tokenRefreshSaga),
    fork(addUserTagsSaga),
    fork(updateUserProfilePicSaga),
    fork(postsSearchSaga),
    fork(postCreateSaga),
    fork(commentsSearchSaga),
    fork(commentCreateSaga),
    fork(userInfoSaga),
    fork(userSearchSaga),
    fork(currentUserSaga),
    fork(messageSearchSaga),
    fork(messageCreateSaga),
    fork(channelSearchSaga),
    fork(channelCreateSaga),
    fork(hashtagTrendingSearchSaga),
    fork(postInfoSaga),
    fork(answerSearchSaga),
    fork(answerCreateSaga),
    fork(notificationSearchSaga),
    fork(notificationReadMarkSaga),

    /*
      saga form UI
    */
    fork(watchShowUserInfo),
    fork(watchShowChannelUsers),

    /*
      saga for webSocket
    */
    fork(webSocket),

    /*
      saga for form
    */
    fork(watchMarkNotificationAsRead),
  ]
}
