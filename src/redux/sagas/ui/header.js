import { put, take, select, takeLatest, call } from 'redux-saga/effects'
import uiActionTypes from '../../actionTypes'

function* donutsThrowAsync({
  target,
  donutColor,
}) {
  yield call(animation, target)
}

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame

function animation(target) {
  const donut = document.getElementById('available-donuts')
  const { top, left }  = donut.getBoundingClientRect()
  const x = left
  const y = top

  // donut.style.position = 'absolute'
  // donut.style.top = y
  // donut.style.left = x

  const move = () => {
    // const requestId = requestAnimationFrame(move)
    //
    // const { top, left }  = donut.getBoundingClientRect()
    // const x = left
    // const y = top
    // console.log('x', x)
    // console.log('target.x', target.x)
    // console.log('y', y)
    // console.log('target.y', target.y)
    // console.log(x > target.x || y > target.y)
    // if (x > target.x && y > target.y) {
    //   cancelAnimationFrame(requestId)
    // }
    //
    // donut.style.top += 1
    // donut.style.left += 1

  }

  move()
}

export function* watchDonutsThrow() {
  yield takeLatest(uiActionTypes.donutsThrow.request, donutsThrowAsync)
}
