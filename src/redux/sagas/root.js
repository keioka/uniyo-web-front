import sagas from './index'

const {
  schoolsSearchSaga,
  logInSaga,
  userCreateSaga,
  tokenRefreshSaga,
} = sagas

export default function* rootSaga() {
  yield [
    schoolsSearchSaga(),
    logInSaga(),
    userCreateSaga(),
    tokenRefreshSaga(),
  ]
}
