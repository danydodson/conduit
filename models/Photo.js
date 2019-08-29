const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const slug = require('slug')
//const User = mongoose.model('User')

const PhotoSchema = new Schema({

  // user input data
  title: { type: String },
  description: { type: String, default: null },
  mediums: { type: String },
  category: { type: String, default: null },
  shareable: { type: Boolean, default: false },
  allow_comments: { type: Boolean, default: false },
  purchasable: { type: Boolean, default: false },
  price: { type: String, default: null },

  // data from upload
  public_id: { type: String },
  version: { type: String },
  format: { type: String },
  width: { type: String },
  height: { type: String },
  type: { type: String },
  bytes: { type: String },
  created_at: { type: String },
  tags: [{ type: String }],
  context: { custom: {} },
  access_mode: { type: String },
  etag: { type: String },
  url: { type: String },
  secure_url: { type: String },
  existing: {},
  colors: [[]],
  predominant: {},
  phash: { type: String },
  original_filename: { type: String },
  delete_token: {},

  // handled data
  slug: { type: String, lowercase: true, unique: true },
  featured: { type: Boolean, default: false },
  favoritesCount: { type: Number, default: 0 },
  likes: [{ user: { type: Schema.Types.ObjectId, ref: 'User' } }],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
},
  { timestamps: true }
)

PhotoSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})

PhotoSchema.pre('validate', function (next) {
  if (!this.slug) { this.slugify() } next()
})

PhotoSchema.methods.slugify = function () {
  this.slug = slug(this.public_id) + '-'
    + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

// PhotoSchema.methods.updateFavoriteCount = function () {
//   const photo = this
//   return User
//     .countDocuments({ favorites: { $in: [photo._id] } })
//     .then(function (count) {
//       photo.favoritesCount = count
//       return photo.save()
//     })
// }

PhotoSchema.methods.toJSONFor = function (user) {
  return {
    // user input data
    title: this.title,
    description: this.description,
    mediums: this.mediums,
    category: this.category,
    shareable: this.shareable,
    purchasable: this.purchasable,
    price: this.price,
    // data from upload
    public_id: this.public_id,
    version: this.version,
    format: this.format,
    width: this.width,
    height: this.height,
    type: this.type,
    bytes: this.bytes,
    created_at: this.created_at,
    tags: this.tags,
    context: this.context,
    access_mode: this.access_mode,
    etag: this.etag,
    url: this.url,
    secure_url: this.secure_url,
    existing: this.existing,
    colors: this.colors,
    predominant: this.predominant,
    phash: this.phash,
    original_filename: this.original_filename,
    delete_token: this.delete_token,
    // handled data
    slug: this.slug,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Photo', PhotoSchema)