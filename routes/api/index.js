const router = require('express').Router()

//-----------------------------------------------------------------------
// declare routes

router.use('/', require('./users'))
router.use('/profiles', require('./profiles'))
router.use('/posts', require('./posts'))
router.use('/tags', require('./tags'))
router.use('/mediums', require('./mediums'))

//-----------------------------------------------------------------------
// throw errs

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message
        return errors
      }, {})
    })
  }
  return next(err)
})

module.exports = router
