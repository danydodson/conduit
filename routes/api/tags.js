const router = require('express').Router()
const mongoose = require('mongoose')
const Post = mongoose.model('Post')

//-----------------------------------------------------------------------
// return a list of tags

router.get('/', (req, res, next) => {
  Post.find()
    .distinct('tagList')
    .then((tags) => res.json({ tags: tags }))
    .catch(next)
})

module.exports = router
