export const placeholderMessage = (users, numberOfShow, currentUserId) => {
  const numberUsers = users.length
  const BASE_MESSAGE = 'Write a message to'
  if (numberUsers < 2) {
    return `${BASE_MESSAGE} @${users[0].firstName}`
  }

  if (numberUsers === 2) {
    const userNamesStringify = users.map(user => `@${user.firstName}`).join(' and ')
    return `${BASE_MESSAGE} ${userNamesStringify}`
  }

  if (numberUsers === 3) {
    return `${BASE_MESSAGE} @${user[0].firstName}, @${user[1].firstName}, and @${user[2].firstName}`
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
  const index = users.find(user => user.id === currentUser.id)
  const usersWithoutCurrentUser = [...users]
  usersWithoutCurrentUser .splice(index, 1)
  return usersWithoutCurrentUser
}
