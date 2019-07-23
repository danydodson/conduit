const http = require('http')
const path = require('path')
const methods = require('methods')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const errorhandler = require('errorhandler')
const morganColors = require('./logs/morgan')
const pretty = require('./config/index').pretty
const chalk = require('./logs/colors')
const SECRET = require('./config/index').SECRET
const DB = require('./config/index').DB_URI

const isProduction = process.env.NODE_ENV === 'production'
// body-parser chalk colors dotenv ejs errorhandler express express-jwt express-session jsonwebtoken method-override methods mongoose mongoose-unique-validator morgan passport passport-local request rotating-file-stream slug underscore
// concurrently newman nodemon
/**
 * "dependencies": {
    "body-parser": "1.15.0",
    "chalk": "^2.4.2",
    "colors": "^1.3.3",
    "cors": "2.7.1",
    "dotenv": "^8.0.0",
    "ejs": "2.4.1",
    "errorhandler": "1.4.3",
    "express": "4.13.4",
    "express-jwt": "3.3.0",
    "express-session": "1.13.0",
    "jsonwebtoken": "7.1.9",
    "method-override": "2.3.5",
    "methods": "1.1.2",
    "mongoose": "^5.6.5",
    "mongoose-unique-validator": "1.0.2",
    "morgan": "1.7.0",
    "passport": "0.3.2",
    "passport-local": "1.0.0",
    "request": "2.69.0",
    "rotating-file-stream": "^1.4.3",
    "slug": "0.9.1",
    "underscore": "1.8.3"
  },
  "devDependencies": {
    "concurrently": "^4.1.1",
    "newman": "^4.5.1",
    "nodemon": "^1.19.1"
  }
 */


// history marked prop-types react react-dom react-redux react-router-dom react-router-redux redux redux-devtools-extension redux-logger superagent superagent-promise
// cross-env react-scripts
/**
 *   "devDependencies": {
    "cross-env": "^5.1.4",
    "react-scripts": "1.1.1"
  },
  "dependencies": {
    "history": "^4.6.3",
    "marked": "^0.3.6",
    "prop-types": "^15.5.10",
    "react": "^16.3.0",
    "react-dom": "^16.3.0",
    "react-redux": "^5.0.7",
    "react-router": "^4.1.2",
    "react-router-dom": "^4.1.2",
    "react-router-redux": "^5.0.0-alpha.6",
    "redux": "^3.6.0",
    "redux-devtools-extension": "^2.13.2",
    "redux-logger": "^3.0.1",
    "superagent": "^3.8.2",
    "superagent-promise": "^1.1.0"
  },
 */

const app = express()

require('dotenv').config()

app.use(cors())
app.use(morganColors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('method-override')())
app.use(express.static(__dirname + '/public'))

app.use(session({
  secret: SECRET,
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}))

if (isProduction) {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
} else {
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  mongoose.set('debug', pretty)
  console.log(chalk.info(`[mongo] Connected to DB...`))
}

if (!isProduction) {
  app.use(errorhandler())
}

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

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
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

const server = app.listen(process.env.PORT || 5000, function () {
  console.log(chalk.info(`[server] Listening on port ${server.address().port}...`))
})

