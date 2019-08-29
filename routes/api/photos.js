const router = require('express').Router()
const mongoose = require('mongoose')
const Photo = mongoose.model('Photo')
const Comment = mongoose.model('Comment')
const User = mongoose.model('User')
const chalk = require('chalk')
const auth = require('../auth-token')

//-----------------------------------------------------------------------
// Preload photo objects on routes with ':photo'

router.param('photo', (req, res, next, slug) => {
  Photo.findOne({ slug: slug })
    .populate('author')
    .then(photo => {
      if (!photo) return res.sendStatus(404)
      req.photo = photo
      return next()
    }).catch(next)
})

//-----------------------------------------------------------------------

router.param('comment', (req, res, next, id) => {
  Comment.findById(id).then((comment) => {
    if (!comment) return res.sendStatus(404)
    req.comment = comment
    return next()
  }).catch(next)
})

//-----------------------------------------------------------------------

router.get('/', auth.optional, (req, res, next) => {
  let query = {}
  let limit = 20
  let offset = 0

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit
  }
  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset
  }
  if (typeof req.query.tag !== 'undefined') {
    query.tagList = { "$in": [req.query.tag] }
  }

  Promise.all([
    req.query.author ? User.findOne({ username: req.query.author }) : null,
    req.query.favorited ? User.findOne({ username: req.query.favorited }) : null
  ]).then(results => {
    let author = results[0]
    let favoriter = results[1]

    if (author) {
      query.author = author._id
    }

    if (favoriter) {
      query._id = { $in: favoriter.favorites }
    } else if (req.query.favorited) {
      query._id = { $in: [] }
    }

    return Promise.all([
      Photo.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .populate('author')
        .exec(),
      Photo.countDocuments(query).exec(),
      req.payload
        ? User.findById(req.payload.id)
        : null,
    ]).then(results => {
      let photos = results[0]
      let photosCount = results[1]
      let user = results[2]
      return res.json({
        photos: photos.map(photo => {
          return photo.toJSONFor(user)
        }),
        photosCount: photosCount
      })
    })
  }).catch(next)
})

//-----------------------------------------------------------------------

router.get('/feed', auth.required, (req, res, next) => {
  let limit = 20
  let offset = 0

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit
  }
  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset
  }

  User.findById(req.payload.id).then(user => {
    if (!user) return res.sendStatus(401)

    Promise.all([
      Photo.find({ author: { $in: user.following } })
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .populate('author')
        .exec(),
      Photo.countDocuments({ author: { $in: user.following } })
    ]).then(results => {
      let photos = results[0]
      let photosCount = results[1]

      return res.json({
        photos: photos.map(photo => {
          return photo.toJSONFor(user)
        }),
        photosCount: photosCount
      })
    }).catch(next)
  })
})

//-----------------------------------------------------------------------

router.post('/', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if (!user) return res.sendStatus(401)

    let photo = new Photo(req.body.photo)
    photo.author = user
    return photo.save().then(() => {
      console.info(chalk.blue(`
      ${`New Photo !`}`))
      console.info(chalk.blue(`
      ${`username: ${photo.author.username}`}
      ${`email: ${photo.author.email}`}
      ${`created at: ${photo.author.createdAt}`}
      ${`updated at: ${photo.author.updatedAt}`}
      `))
      return res.json({ photo: photo.toJSONFor(user) })
    })
  }).catch(next)
})

//-----------------------------------------------------------------------
// return a photo

router.get('/:photo', auth.optional, (req, res, next) => {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.photo.populate('author').execPopulate()
  ]).then(results => {
    let user = results[0]
    return res.json({ photo: req.photo.toJSONFor(user) })
  }).catch(next)
})

//-----------------------------------------------------------------------
// update photo

router.put('/:photo', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if (req.photo.author._id.toString() === req.payload.id.toString()) {
      if (typeof req.body.photo.title !== 'undefined') {
        req.photo.title = req.body.photo.title
      }
      if (typeof req.body.photo.description !== 'undefined') {
        req.photo.description = req.body.photo.description
      }
      if (typeof req.body.photo.body !== 'undefined') {
        req.photo.body = req.body.photo.body
      }
      if (typeof req.body.photo.medium !== 'undefined') {
        req.photo.body = req.body.photo.medium
      }
      if (typeof req.body.photo.tagList !== 'undefined') {
        req.photo.tagList = req.body.photo.tagList
      }
      req.photo.save().then(photo => {
        return res.json({ photo: photo.toJSONFor(user) })
      }).catch(next)
    } else {
      return res.sendStatus(403)
    }
  })
})

//-----------------------------------------------------------------------
// delete photo

router.delete('/:photo', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if (!user) return res.sendStatus(401)
    if (req.photo.author._id.toString() === req.payload.id.toString()) {
      return req.photo.remove().then(() => res.sendStatus(204))
    } else {
      return res.sendStatus(403)
    }
  }).catch(next)
})

//-----------------------------------------------------------------------
// Favorite an photo

router.post('/:photo/favorite', auth.required, (req, res, next) => {
  let photoId = req.photo._id
  User.findById(req.payload.id).then(user => {
    if (!user) return res.sendStatus(401)
    return user.favorite(photoId).then(() => {
      return req.photo.updateFavoriteCount().then(photo => {
        return res.json({ photo: photo.toJSONFor(user) })
      })
    })
  }).catch(next)
})

//-----------------------------------------------------------------------
// Unfavorite an photo

router.delete('/:photo/favorite', auth.required, (req, res, next) => {
  let photoId = req.photo._id
  User.findById(req.payload.id).then(user => {
    if (!user) return res.sendStatus(401)
    return user.unfavorite(photoId).then(() => {
      return req.photo.updateFavoriteCount().then(photo => {
        return res.json({ photo: photo.toJSONFor(user) })
      })
    })
  }).catch(next)
})

//-----------------------------------------------------------------------
// return an photo's comments

router.get('/:photo/comments', auth.optional, (req, res, next) => {
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(user => {
    return req.photo.populate({
      path: 'comments',
      populate: { path: 'author' },
      options: {
        sort: { createdAt: 'desc' }
      }
    }).execPopulate().then(photo => {
      return res.json({
        comments: req.photo.comments.map(comment => {
          return comment.toJSONFor(user)
        })
      })
    })
  }).catch(next)
})

//-----------------------------------------------------------------------
// create a new comment

router.post('/:photo/comments', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if (!user) return res.sendStatus(401)
    let comment = new Comment(req.body.comment)
    comment.photo = req.photo
    comment.author = user
    return comment.save().then(() => {
      req.photo.comments.push(comment)
      return req.photo.save().then(photo => {
        res.json({ comment: comment.toJSONFor(user) })
      })
    })
  }).catch(next)
})

//-----------------------------------------------------------------------
// delete a comment

router.delete('/:photo/comments/:comment', auth.required, (req, res, next) => {
  if (req.comment.author.toString() === req.payload.id.toString()) {
    req.photo.comments.remove(req.comment._id)
    req.photo.save()
      .then(Comment.find({ _id: req.comment._id }).remove().exec())
      .then(() => res.sendStatus(204))
  } else {
    res.sendStatus(403)
  }
})

module.exports = router
