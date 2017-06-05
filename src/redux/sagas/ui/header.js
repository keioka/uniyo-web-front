import { put, take, select, takeLatest, call } from 'redux-saga/effects'
import uiActionTypes from '../../actionTypes'

function* donutsThrowAsync({
  target,
  donutColor,
}) {

}

export function* watchDonutsThrow() {
  yield takeLatest(uiActionTypes.donutsThrow.request, donutsThrowAsync)
}
