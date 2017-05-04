export default (textArea) => {
  let text = textArea.textContent

  text = text.replace(/</g, '&lt;')
             .replace(/>/g, '&gt;')

  const userIds = textArea.innerHTML.match(/data-user-id\=\"[0-9]+\"/g)
                                    .map(id => id.match(/[0-9]+/)[0])

  const mentionDOM = textArea.querySelectorAll("span[data-user-id]")
  const mentionUserStringArray = Array.from(mentionDOM).map(ele => ele.innerText)

  mentionUserStringArray.forEach((userName, index) => {
    const userId = userIds[index]
    text = text.replace(userName, `<@${userId}>`)
  })

  return text
}
