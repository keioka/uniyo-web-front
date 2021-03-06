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
  postDeleteSaga,
  commentsSearchSaga,
  commentCreateSaga,
  commentDeleteSaga,
  userInfoSaga,
  userAllSaga,
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
  watchPopupShow,
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
  deleteDeviceSaga,
  deviceManageSaga,
  resetPasswordSaga,
  newPasswordUpdateSaga,
  userPictureUpdateRefreshSaga,
  watchUserSearchSuccess,
  watchChannelSearchSuccess,
  signoutProcessSaga,
  sharePostFetchSaga,
  watchFetchGifImagesSaga,
  resendVerificationEmailSaga,
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
    fork(postDeleteSaga),
    fork(commentsSearchSaga),
    fork(commentCreateSaga),
    fork(userInfoSaga),
    fork(userSearchSaga),
    fork(userAllSaga),
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
    fork(deleteDeviceSaga),
    fork(resetPasswordSaga),
    fork(hashtagSearchSaga),
    fork(newPasswordUpdateSaga),
    fork(userPictureUpdateRefreshSaga),
    fork(commentDeleteSaga),
    fork(sharePostFetchSaga),
    fork(resendVerificationEmailSaga),
    /*
      saga form UI
    */

    fork(signoutProcessSaga),
    fork(watchShowUserInfo),
    fork(watchShowChannelUsers),
    fork(watchShowChannelUsers),
    fork(watchDonutsThrow),
    fork(watchDonutsShift),
    fork(watchContentReadCheckNotificationSaga),
    fork(watchPopupShow),
    fork(deviceManageSaga),
    /*
      saga for webSocket
    */
    fork(webSocket),
    fork(watchUserSearchSuccess),
    fork(watchChannelSearchSuccess),

    /*
      saga for form
    */
    fork(watchMarkNotificationAsRead),


    /*
      saga for input
    */
    fork(watchFetchGifImagesSaga),
  ]
}
