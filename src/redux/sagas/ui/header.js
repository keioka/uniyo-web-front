import { put, take, select, takeLatest, call } from 'redux-saga/effects'
import uiActionTypes from '../../actionTypes'

function* donutsThrowAsync({
  target,
  donutColor,
}) {
  yield call(animation, target)
}

function animation(target) {
  const donut = document.getElementById('available-donuts')
  console.log(donut)

  const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  requestAnimationFrame(move)
  const move = () => {
    donut.style.position = 'absolute'
    donut.style.top = target.y
    donut.style.left = target.x
    requestAnimationFrame(move)
  }

}

export function* watchDonutsThrow() {
  yield takeLatest(uiActionTypes.donutsThrow.request, donutsThrowAsync)
}
