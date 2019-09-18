const router = require('express').Router()
const mongoose = require('mongoose')
const Post = mongoose.model('Post')

//-----------------------------------------------------------------------
// 

router.get('/', (req, res, next) => {
  Post.find()
    .distinct('medium')
    .then((medium) => res.json({ medium: medium }))
    .catch(next)
})

module.exports = router
