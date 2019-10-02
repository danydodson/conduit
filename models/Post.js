const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const slug = require('slug')
const crypto = require('crypto')
const User = mongoose.model('User')

const PostSchema = new Schema({
  uploads: [],
  signature: String,
  title: String,
  description: String,
  body: String,
  medium: [String],
  purchasable: Boolean,
  price: String,
  shareable: Boolean,
  tagList: [String],
  allow_comments: Boolean,
  featured: Boolean,
  slug: { type: String, lowercase: true, unique: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  favoritesCount: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
},
  { timestamps: true }
)

PostSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})

PostSchema.pre('validate', function (next) {
  if (!this.slug) { this.slugify() } next()
})

PostSchema.methods.slugify = function () {
  this.slug = slug(this.title) + '-'
    + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

PostSchema.methods.updateFavoriteCount = function () {
  const post = this
  return User
    .countDocuments({ favorites: { $in: [post._id] } })
    .then(function (count) {
      post.favoritesCount = count
      return post.save()
    })
}

PostSchema.methods.validateSignature = function (signature) {
  var hash = crypto.pbkdf2Sync(signature, this.salt, 10000, 512, 'sha1').toString('hex')
  return this.hash === hash
}

PostSchema.methods.setSignature = function (signature) {
  var hash = crypto.createHash('sha1').update(signature, 'utf8').digest('hex')
  this.signature = hash
  return this.signature
}

PostSchema.methods.toJSONFor = function (user) {
  return {
    slug: this.slug,
    uploads: this.uploads,
    title: this.title,
    description: this.description,
    body: this.body,
    medium: this.medium,
    purchasable: this.purchasable,
    price: this.price,
    shareable: this.shareable,
    tagList: this.tagList,
    allow_comments: this.allow_comments,
    featured: this.featured,
    author: this.author.toProfileJSONFor(user),
    favoritesCount: this.favoritesCount,
    comments: this.comments,
    favorited: user ? user.isFavorite(this._id) : false,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Post', PostSchema)