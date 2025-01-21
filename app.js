const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Express from Local Dev Box')
})

app.listen(5500)