const mongoose = require('mongoose')
const router = require('express').Router()
const passport = require('passport')
const User = mongoose.model('User')
const auth = require('../auth/auth-token')

//-----------------------------------------------------------------------

router.get('/user', auth.required, (req, res, next) => {
  User.findById(req.payload.id)
    .then(user => {
      if (!user) res.sendStatus(401)
      return res.json({ user: user.toAuthJSON() })
    }).catch(next)
})

//-----------------------------------------------------------------------

router.put('/user', auth.required, (req, res, next) => {
  User.findById(req.payload.id)
    .then(user => {
      if (!user) res.sendStatus(401)
      if (typeof req.body.user.username !== 'undefined') {
        user.username = req.body.user.username
      }
      if (typeof req.body.user.email !== 'undefined') {
        user.email = req.body.user.email
      }
      if (typeof req.body.user.bio !== 'undefined') {
        user.bio = req.body.user.bio
      }
      if (typeof req.body.user.image !== 'undefined') {
        user.image = req.body.user.image
      }
      if (typeof req.body.user.password !== 'undefined') {
        user.setPassword(req.body.user.password)
      }
      return user.save().then(() => {
        return res.json({ user: user.toAuthJSON() })
      })
    }).catch(next)
})

//-----------------------------------------------------------------------

router.post('/users/login', (req, res, next) => {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } })
  }
  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } })
  }
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) next(err)
    if (user) {
      user.token = user.generateJWT()
      return res.json({ user: user.toAuthJSON() })
    } else {
      return res.status(422).json(info)
    }
  })(req, res, next)
})

//-----------------------------------------------------------------------

router.post('/users', (req, res, next) => {
  var user = new User()
  user.username = req.body.user.username
  user.email = req.body.user.email
  user.setPassword(req.body.user.password)
  user.save()
    .then(() => res.json({ user: user.toAuthJSON() }))
    .catch(next)
})

//-----------------------------------------------------------------------

router.delete('/user', auth.required, (req, res) => {
  User.findOneAndRemove({ _id: req.payload.id })
    .then(() => res.json({ success: true }))
})


//-----------------------------------------------------------------------

module.exports = router
