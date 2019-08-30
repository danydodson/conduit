var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var SECRET = require('../config').SECRET

var UserSchema = new mongoose.Schema({
  bio: String,
  hash: String,
  salt: String,
  image: String,
  username: {
    type: String,
    index: true,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid']
  },
  email: {
    type: String,
    index: true,
    unique: true,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  type: { type: String, default: 'basic' },
  is_new: { type: String, default: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},
  { timestamps: true }
)


UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.generateJWT = function () {
  var today = new Date()
  var exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign({
    id: this._id,
    username: this.username,
    image: this.image,
    exp: parseInt(exp.getTime() / 1000),
  }, SECRET)
}

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  }
}

UserSchema.methods.toProfileJSONFor = function (user) {
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || 'https://res.cloudinary.com/scenicloud/image/upload/v1566379881/seesee/heart.png',
    following: user ? user.isFollowing(this._id) : false
  }
}

UserSchema.methods.favorite = function (id) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites.push(id)
  }

  return this.save()
}

UserSchema.methods.unfavorite = function (id) {
  this.favorites.remove(id)
  return this.save()
}

UserSchema.methods.isFavorite = function (id) {
  return this.favorites.some(function (favoriteId) {
    return favoriteId.toString() === id.toString()
  })
}

UserSchema.methods.follow = function (id) {
  if (this.following.indexOf(id) === -1) {
    this.following.push(id)
  }

  return this.save()
}

UserSchema.methods.unfollow = function (id) {
  this.following.remove(id)
  return this.save()
}

UserSchema.methods.isFollowing = function (id) {
  return this.following.some(function (followId) {
    return followId.toString() === id.toString()
  })
}

mongoose.model('User', UserSchema)
