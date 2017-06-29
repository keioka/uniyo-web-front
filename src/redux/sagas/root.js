import sagas from './index'
import { fork } from 'redux-saga/effects'

const {
  schoolInfoSaga,
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
  hashtagDeleteSaga,
  hashtagSearchSaga,
  answerSearchSaga,
  answerCreateSaga,
  notificationSearchSaga,
  notificationReadMarkSaga,
  webSocket,
  watchMarkNotificationAsRead,
  watchUserReceivedDonutsFetch,
  watchContentReadCheckNotificationSaga,
  watchDonutsThrow,
  watchDonutsShift,
  postsRelevantSearchSaga,
  postsTrendingSearchSaga,
  currentUserDonutsSaga,
  commentGiveDonutsSaga,
  postGiveDonutsSaga,
  userGiveDonutsSaga,
  addDeviceSaga,
  resetPasswordSaga,
  newPasswordUpdateSaga,
} = sagas

export default function* rootSaga() {
  yield [
    /*
      saga for api
    */
    fork(schoolInfoSaga),
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
    fork(hashtagDeleteSaga),
    fork(postsRelevantSearchSaga),
    fork(postsTrendingSearchSaga),
    fork(currentUserDonutsSaga),
    fork(commentGiveDonutsSaga),
    fork(postGiveDonutsSaga),
    fork(userGiveDonutsSaga),
    fork(addDeviceSaga),
    fork(resetPasswordSaga),
    fork(hashtagSearchSaga),
    fork(newPasswordUpdateSaga),
    /*
      saga form UI
    */
    fork(watchShowUserInfo),
    fork(watchShowChannelUsers),
    fork(watchShowChannelUsers),
    fork(watchDonutsThrow),
    fork(watchDonutsShift),
    fork(watchContentReadCheckNotificationSaga),
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
