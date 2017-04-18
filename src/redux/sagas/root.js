import sagas from './index'

const {
  schoolsSearchSaga,
  logInSaga,
  userCreateSaga,
  tokenRefreshSaga,
  addUserTagsSaga,
  updateUserProfilePicSaga,
  postsSearchSaga,
} = sagas

export default function* rootSaga() {
  yield [
    schoolsSearchSaga(),
    logInSaga(),
    userCreateSaga(),
    tokenRefreshSaga(),
    addUserTagsSaga(),
    updateUserProfilePicSaga(),
    postsSearchSaga(),
  ]
}
