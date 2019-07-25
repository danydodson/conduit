const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const errorhandler = require('errorhandler')
const colorMorgan = require('./logs/morgan')
const mongoose = require('mongoose')
const log = require('./logs/colors')
const cors = require('cors')
const app = express()

require('dotenv').config()

const key = require('./config/index')
const prod = process.env.NODE_ENV

if (process.env.NODE_ENV === 'production') {
  mongoose.set('debug', key.clean)
  app.use(errorhandler())
  app.use(colorMorgan())
}


const conn = db => mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true
})

conn(key.db)
  .then(() => log.info(`[mongodb] connected to db`))
  .catch(err => log.err(err))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('method-override')())

app.use(express.static(__dirname + '/public'))

app.use(session({
  secret: key.secret,
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

// development error handler
// will print stacktrace
if (!prod) {
  app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(err.status || 500)
    res.json({
      'errors': {
        message: err.message,
        error: err
      }
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  })
})

const port = process.env.PORT || 5000

app.listen(port, () => log.info(`[express] listening on port ${port}`))
