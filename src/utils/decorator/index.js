export const placeholderMessage = (users, numberOfShow, currentUserId) => {
  const numberUsers = users.length
  const BASE_MESSAGE = 'Write a message to'
  if (numberUsers === 1) {
    return `${BASE_MESSAGE} @${users[0].firstName}`
  }

  if (numberUsers === 2) {
    const userNamesStringify = users.map(user => `@${user.firstName}`).join(' and ')
    return `${BASE_MESSAGE} ${userNamesStringify}`
  }

  if (numberUsers === 3) {
    return `${BASE_MESSAGE} @${users[0].firstName}, @${users[1].firstName}, and @${users[2].firstName}`
  }

  if (numberUsers > 3) {
    const userNamesStringify = users.slice(0, 3).map(user => `@${user.firstName}`).join(', ')
    const restNumber = numberUsers - 3
    return `${BASE_MESSAGE} ${userNamesStringify} and ${restNumber} others`
  }
}

export const usersWithoutCurrentUser = (users, currentUser) => {
  if (!users || !currentUser) {
    console.warn('usersWithoutCurrentUser did not get users or currentUser')
  }
  if (users.length === 1) {
    return users
  }
  const index = users.findIndex(user => user.id === currentUser.id)
  const usersWithoutCurrentUser = [...users]
  usersWithoutCurrentUser.splice(index, 1)
  return usersWithoutCurrentUser
}


const postTypeTransform = (notification) => {
  const postType = notification.post.type
  let transformedPostType
  switch (postType) {
    case 'CLASS_NOTE':
      transformedPostType = 'document'
    case 'REVIEW':
      transformedPostType = 'review'
    case 'POST':
      transformedPostType = 'publication'
    case 'QUESTION':
      transformedPostType = 'question'
  }

  return transformedPostType
}

const userName = (user) => {

}

export const notification = (notifiction) => {
  const type = notifiction.type

  switch (type) {
    case 'POST_MENTION': {
      mentionNotification(notifiction)
      break
    }

    case 'POST_HASHTAG': {
      postHashtagNotification(notifiction)
      break
    }

    case 'NEW_COMMENT': {
      commentNotification(notifiction)
      break
    }

    case 'NEW_CHANNEL_MESSAGE': {
      const user = notification.channel.users[0]
      userImageUrl = user ? user.image.smallUrl : ''
      component = (<span>new messages in your private chat with <span>@{user.firstName}</span></span>)
      break
    }
  }
}

export const messageNotification = (notification) => {
  const user = notification.channel.users[0]
  const message = `send you a new message`

  // const result = {
  //   path:
  //   userName: user.firstName,
  //   userImageUrl: user.image.mediumUrl,
  //   message,
  // }

  return result
}

export const commentNotification = (notification) => {
  const { comment } = notification
  const { user } = post
  const type = postTypeTransform(notification)
  const message = `commented on your ${type}`

  const result = {
    userName: user.firstName,
    userImageUrl: user.image.mediumUrl,
    message,
  }

  return result
}

export const mentionNotification = (notification) => {
  const { user } = post
  const type = postTypeTransform(notification)
  const message = `mentioned you in a ${type}`

  const result = {
    userName: user.firstName,
    userImageUrl: user.image.mediumUrl,
    message,
  }

  return result
}

export const postHashtagNotification = () => {
  const { user } = post
  const type = postTypeTransform(notification)

  const message = `made a new ${type} about`

  const result = {
    userName: user.firstName,
    userImageUrl: user.image.mediumUrl,
    message,
  }

  return result
}

export const newPostNotification = (notification) => {
  postTypeTransform(notification)
}
