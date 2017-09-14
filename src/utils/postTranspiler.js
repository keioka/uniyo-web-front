export default (textArea) => {
  let text = textArea.textContent
  text = textArea.innerHTML.replace(/\<span (\w+)[^>]+>[^>]+>/g, '').replace(/\<\/span+>/g, '').replace(/<br>/g, '\n')
  text = text.replace(/</g, '&lt;')
             .replace(/>/g, '&gt;')
             .replace(/&nbsp;/g, ' ')

  let userIds = textArea.innerHTML.match(/data-user-id\=\"[0-9]+\"/g)

  if (userIds && userIds.length > 0) {
    userIds = userIds.map(id => id.match(/[0-9]+/)[0])

    const mentionDOM = textArea.querySelectorAll("span[data-user-id]")
    const mentionUserStringArray = Array.from(mentionDOM).map(ele => ele.innerText)

    mentionUserStringArray.forEach((userName, index) => {
      const userId = userIds[index]
      text = text.replace(userName, `<@${userId}>`)
    })
  }

  return text
}
