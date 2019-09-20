const router = require('express').Router()
const mongoose = require('mongoose')
const Post = mongoose.model('Post')

//-----------------------------------------------------------------------
// 

router.get('/', (req, res, next) => {
  Post.find()
    .distinct('medium')
    .then((mediums) => res.json({ mediums: mediums }))
    .catch(next)
})

module.exports = router
