const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const errorhandler = require('errorhandler')
const morganLogs = require('./logs/morgan')
const chalk = require('chalk')

const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()

const PROD = 'production'
const DBURI = require('./config').DBURI
const SECRET = require('./config').SECRET
const PORT = process.env.PORT || 5001

mongoose.connect(DBURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
}).then(() => console.info(chalk.blue(`[mongo] mongo ✓`)))
  .catch(err => console.error(chalk.red(err)))

// const mongooselogs = require('./logs/mongoose')
// mongoose.set('debug', mongooselogs)

app.use(cors())
app.use(morganLogs())
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
require('./models/Article')
require('./models/Comment')
require('./config/passport')

app.use(require('./routes'))

/// catch 404 and forward to error handler

app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler will print stacktrace

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

// production error handler no stacktraces leaked to user

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