import { actionTypes } from 'uniyo-redux'
import { actions } from 'uniyo-redux'
import { storage } from '../../utils'
import { browserHistory } from 'react-router'
export const accessTokenValidator = store => next => action => {

  if (!localStorage) {
    console.warn("Local Storage is not available")
  }

  if (action.type === actionTypes.tokenRefresh.error) {
    //storage.clear()
  }


  if (
    action.type === actionTypes.commentsSearch.request ||
    action.type === actionTypes.postsSearch.request ||
    action.type === actionTypes.postCreate.request ||
    action.type === actionTypes.commentCreate.request ||
    action.type === actionTypes.userSearch.request ||
    action.type === actionTypes.hashtagAdd.request ||
    action.type === actionTypes.postInfo.request ||
    action.type === actionTypes.answerSearch.request ||
    action.type === actionTypes.answerCreate.request ||
    action.type === actionTypes.messageSearch.request ||
    action.type === actionTypes.messageCreate.request
  ) {
    action.accessToken = storage.accessToken
  }

  if (
    action.type === actionTypes.userCreate.success ||
    action.type === actionTypes.logIn.success ||
    action.type === actionTypes.tokenRefresh.success
  ) {

    const setTokens = new Promise((resolve, reject) => {
      try {
        console.log('%c setToken', 'color: blue')
        storage.setTokensFromResponse(action.result.data)
        resolve("Success")
      } catch(e) {
        reject(e)
      }
    })

    setTokens.then((result) => {
      console.log('%c Token is saved on local server ', 'color: blue')
      console.log(actions)
      store.dispatch(actions.postsSearch({
        limit: 50,
        accessToken: storage.accessToken
      }))
    }).catch((e) => {
      console.warn(e)
    })
  }

  // //refreshAccessTokenIfNeeded
  // if (storage.hasValidAccessTokens && storage.isAccessTokenExpired) {
  //   console.warn("Token is expired")
  //   store.dispatch(actions.tokenRefresh(storage.refreshToken))
  // }
  return next(action)
}
