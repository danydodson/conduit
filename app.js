const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const errorhandler = require('errorhandler')
const mongooselogs = require('./logs/mongoose')
const morganLogs = require('./logs/morgan')
const mongoose = require('mongoose')
const log = require('./logs/chalk')
const cors = require('cors')
const app = express()

require('dotenv').config()

const PROD = 'production'
const DBURI = require('./config').DBURI
const SECRET = require('./config').SECRET

mongoose.connect(DBURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
}).then(() => console.log(log.info(`[mongodb] Connection: mongoDB`)))
  .catch(err => console.log(log.error(err)))


//mongoose.set('debug', mongooselogs)

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

// development error handler
// will print stacktrace
if (!PROD) {
  app.use(function (err, req, res, next) {
    console.log(log.err(err.stack))
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

const PORT = process.env.PORT || 5001

app.listen(PORT, () => console.log(log.info(`[express] Port: ${PORT}`)))
