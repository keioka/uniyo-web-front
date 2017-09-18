import { put, take, select, takeLatest, call, fork } from 'redux-saga/effects'
import uiActionTypes from '../../actionTypes'
import { actionTypes } from 'uniyo-redux'
import axios from 'axios'

const TENOR_API_KEY = '1E6YJSC27XCG'

const fetchTenorAPI = (pathName) => {
  return axios.get(`https://api.tenor.co/v1/search?${pathName}key=${TENOR_API_KEY}`)
}

function* fetchGifImagesAsync({ query }) {
  const pathName = query ? `tag=${query}&` : ''
  try {
    const response = yield call(fetchTenorAPI, pathName)
    yield put({ type: uiActionTypes.fetchGifImages.success, payload: response.data.results })
  } catch (error) {
    yield put({ type: uiActionTypes.fetchGifImages.error, error })
  }
}

export function* watchFetchGifImagesSaga() {
  yield takeLatest(uiActionTypes.fetchGifImages.request, fetchGifImagesAsync)
}
