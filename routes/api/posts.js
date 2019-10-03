const router = require('express').Router()
const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const Comment = mongoose.model('Comment')
const User = mongoose.model('User')
const chalk = require('chalk')
const auth = require('../auth/auth-token')
// const CLOUD_KEY = require('./config').CLOUD_KEY
// const CLOUD_SECRET = require('../../config').CLOUD_SECRET

//-----------------------------------------------------------------------
// Preload post objects on routes with ':post'

router.param('post', (req, res, next, slug) => {
  Post.findOne({ slug: slug })
    .populate('author')
    .then(post => {
      if (!post) return res.sendStatus(404)
      req.post = post
      return next()
    }).catch(next)
})

//-----------------------------------------------------------------------
// Preload comment objects on routes 

router.param('comment', (req, res, next, id) => {
  Comment.findById(id).then((comment) => {
    if (!comment) return res.sendStatus(404)
    req.comment = comment
    return next()
  }).catch(next)
})

//-----------------------------------------------------------------------

router.get('/', auth.optional, (req, res, next) => {

  // query all mediums and tags

  let query = {}
  let limit = 20
  let offset = 0

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit
  }
  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset
  }
  if (typeof req.query.medium !== 'undefined') {
    query.medium = { "$in": [req.query.medium] }
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

    if (author) { query.author = author._id }
    if (favoriter) {
      query._id = { $in: favoriter.favorites }
    } else if (req.query.favorited) {
      query._id = { $in: [] }
    }

    return Promise.all([
      Post.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .populate('author')
        .exec(),
      Post.countDocuments(query).exec(),
      req.payload ? User.findById(req.payload.id) : null
    ]).then(results => {
      //console.log(results)
      let posts = results[0]
      let postsCount = results[1]
      let user = results[2]
      return res.json({
        posts: posts.map(post => {
          return post.toJSONFor(user)
        }),
        postsCount: postsCount
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
      Post.find({ author: { $in: user.following } })
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .populate('author')
        .exec(),
      Post.countDocuments({ author: { $in: user.following } })
    ]).then(results => {
      let posts = results[0]
      let postsCount = results[1]

      return res.json({
        posts: posts.map(post => {
          return post.toJSONFor(user)
        }),
        postsCount: postsCount
      })
    }).catch(next)
  })
})

//-----------------------------------------------------------------------
// create a post

router.post('/', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if (!user) return res.sendStatus(401)
    let post = new Post(req.body.post)
    post.author = user
    return post.save().then(() => {
      return res.json({ post: post.toJSONFor(user) })
    })
  }).catch(next)
})

//-----------------------------------------------------------------------
// return a post

router.get('/:post', auth.optional, (req, res, next) => {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.post.populate('author').execPopulate()
  ]).then(results => {
    let user = results[0]
    return res.json({ post: req.post.toJSONFor(user) })
  }).catch(next)
})

//-----------------------------------------------------------------------
// update post

router.put('/:post', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if (req.post.author._id.toString() === req.payload.id.toString()) {

      if (typeof req.body.post.uploads !== 'undefined') {
        req.post.uploads = req.body.post.uploads
      }
      if (typeof req.body.post.signature !== 'undefined') {
        req.post.signature = req.body.post.signature
      }
      if (typeof req.body.post.medium !== 'undefined') {
        req.post.medium = req.body.post.medium
      }
      if (typeof req.body.post.title !== 'undefined') {
        req.post.title = req.body.post.title
      }
      if (typeof req.body.post.description !== 'undefined') {
        req.post.description = req.body.post.description
      }
      if (typeof req.body.post.body !== 'undefined') {
        req.post.body = req.body.post.body
      }
      if (typeof req.body.post.shareable !== 'undefined') {
        req.post.shareable = req.body.post.shareable
      }
      if (typeof req.body.post.allow_comments !== 'undefined') {
        req.post.allow_comments = req.body.post.allow_comments
      }
      if (typeof req.body.post.purchasable !== 'undefined') {
        req.post.purchasable = req.body.post.purchasable
      }
      if (typeof req.body.post.price !== 'undefined') {
        req.post.price = req.body.post.price
      }
      if (typeof req.body.post.tagList !== 'undefined') {
        req.post.tagList = req.body.post.tagList
      }
      req.post.save().then(post => {
        return res.json({ post: post.toJSONFor(user) })
      }).catch(next)
    } else {
      return res.sendStatus(403)
    }
  })
})

//-----------------------------------------------------------------------
// delete post

router.delete('/:post', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if (!user) return res.sendStatus(401)
    if (req.post.author._id.toString() === req.payload.id.toString()) {
      return Comment.deleteMany({ post: { $eq: req.post.id } }).then(() => {
        return req.post.remove().then(() => res.sendStatus(204))
      })
    } else {
      return res.sendStatus(403)
    }
  }).catch(next)
})

//-----------------------------------------------------------------------
// Favorite an post

router.post('/:post/favorite', auth.required, (req, res, next) => {
  let postId = req.post._id
  User.findById(req.payload.id).then(user => {
    if (!user) return res.sendStatus(401)
    return user.favorite(postId).then(() => {
      return req.post.updateFavoriteCount().then(post => {
        return res.json({ post: post.toJSONFor(user) })
      })
    })
  }).catch(next)
})

//-----------------------------------------------------------------------
// Unfavorite an post

router.delete('/:post/favorite', auth.required, (req, res, next) => {
  let postId = req.post._id
  User.findById(req.payload.id).then(user => {
    if (!user) return res.sendStatus(401)
    return user.unfavorite(postId).then(() => {
      return req.post.updateFavoriteCount().then(post => {
        return res.json({ post: post.toJSONFor(user) })
      })
    })
  }).catch(next)
})

//-----------------------------------------------------------------------
// return an post's comments

router.get('/:post/comments', auth.optional, (req, res, next) => {
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(user => {
    return req.post.populate({
      path: 'comments',
      populate: { path: 'author' },
      options: {
        sort: { createdAt: 'desc' }
      }
    }).execPopulate().then(post => {
      return res.json({
        comments: req.post.comments.map(comment => {
          return comment.toJSONFor(user)
        })
      })
    })
  }).catch(next)
})

//-----------------------------------------------------------------------
// create a new comment

router.post('/:post/comments', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if (!user) return res.sendStatus(401)
    let comment = new Comment(req.body.comment)
    comment.post = req.post
    comment.author = user
    return comment.save().then(() => {
      req.post.comments.push(comment)
      return req.post.save().then(post => {
        res.json({ comment: comment.toJSONFor(user) })
      })
    })
  }).catch(next)
})

//-----------------------------------------------------------------------
// delete a comment

router.delete('/:post/comments/:comment', auth.required, (req, res, next) => {
  if (req.comment.author.toString() === req.payload.id.toString()) {
    req.post.comments.deleteOne(req.comment._id)
    req.post.save()
      .then(Comment.find({ _id: req.comment._id }).remove().exec())
      .then(() => res.sendStatus(204))
  } else {
    res.sendStatus(403)
  }
})

module.exports = router
