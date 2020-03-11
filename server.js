const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const errorhandler = require('errorhandler')

// const logger = require('./logs/logger')
const chalk = require('chalk')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

require('dotenv').config()

const MONGO_URI = require('./config').MONGO_URI
const SECRET = require('./config').SECRET
const PORT = process.env.PORT || '5001'
const PROD = 'production'

mongoose.connect(MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(() => console.info(chalk.blue(`[mongo] mongo ✓`)))
  .catch(err => console.error(chalk.red(err)))

// const mongooselogs = require('./logs/mongoose')
// Smongoose.set('debug', mongooselogs)

app.use(cors())
// app.use(logger())
app.use(errorhandler())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.use(require('method-override')())

app.use(session({
  secret: SECRET,
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}))

require('./models/User')
require('./models/Post')
require('./models/Comment')
require('./routes/auth/auth-passport')

app.use(require('./routes'))

// catch 404 and forward to err handler

app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// dev err handler prints stacktrace

if (!PROD) {
  app.use(function (err, req, res, next) {
    console.error(chalk.red(err.stack))
    res.status(err.status || 500)
    res.json({
      'errors': {
        message: err.message,
        error: err
      }
    })
  })
}

// prod err handler no stacktraces leaked to user

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  })
})

app.listen(PORT, () => console.info(chalk.blue((`[express] port: ${PORT} ✓`))))