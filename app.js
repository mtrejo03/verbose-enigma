const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Express from Internet')
})

app.listen(5500)