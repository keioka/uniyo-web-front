const express = require('express')
const app = express()
const path = require('path')

const port = '3000'

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use((req, res) => {
  res.sendFile('./index.html', { root: __dirname })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
