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
  currentUserSaga,
} = sagas

console.log(sagas)
export default function* rootSaga() {
  yield [
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
    fork(currentUserSaga),
  ]
}
