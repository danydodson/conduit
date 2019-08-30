const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const slug = require('slug')
const User = mongoose.model('User')

const PostSchema = new Schema({
  public_id: { type: String },
  version: { type: String },
  format: { type: String },
  width: { type: String },
  height: { type: String },
  type: { type: String },
  bytes: { type: String },
  created_at: { type: String },
  tagList: [{ type: String }],
  access_mode: { type: String },
  url: { type: String },
  secure_url: { type: String },
  existing: {},
  colors: [[]],
  predominant: {},
  phash: { type: String },
  original_filename: { type: String },
  delete_token: {},
  // user defined
  title: { type: String },
  description: { type: String, default: null },
  body: String,
  mediumList: [{ type: String }],
  category: { type: String, default: null },
  shareable: { type: Boolean, default: false },
  allow_comments: { type: Boolean, default: false },
  purchasable: { type: Boolean, default: false },
  price: { type: String, default: null },
  // ex paint itemId = 20
  itemId: { type: Number },
  slug: { type: String, lowercase: true, unique: true },
  thumb_url: { type: String, default: null },
  preview_url: { type: String, default: null },
  modal_url: { type: String, default: null },
  permalink: { type: String, default: null },
  duration: { type: String, default: null },
  featured: { type: Boolean, default: false },
  favoritesCount: { type: Number, default: 0 },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  facet_options: {
    title: String, default: '',
    query_term: String, default: '',
    facet_items: [{
      title: String, default: '',
      query_term: String, default: '',
      url: String, default: ''
    }]
  },
  context: {
    title: String, query_term: String,
    facet_items: [{ title: String, query_term: String, url: String }]
  },
  // context: { facet_type: {}, facet_content: {}, facet_category: {} },
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

PostSchema.methods.toJSONFor = function (user) {
  return {
    public_id: this.public_id,
    version: this.version,
    format: this.format,
    width: this.width,
    height: this.height,
    type: this.type,
    bytes: this.bytes,
    created_at: this.created_at,
    tagList: this.tagList,
    access_mode: this.access_mode,
    url: this.url,
    secure_url: this.secure_url,
    existing: this.existing,
    colors: this.colors,
    predominant: this.predominant,
    phash: this.phash,
    original_filename: this.original_filename,
    delete_token: this.delete_token,

    title: this.title,
    description: this.description,
    body: this.body,
    category: this.category,
    mediumList: this.mediumList,
    shareable: this.shareable,
    purchasable: this.purchasable,
    price: this.price,

    itemId: this.itemId,
    slug: this.slug,
    thumb_url: this.thumb_url,
    preview_url: this.preview_url,
    modal_url: this.modal_url,
    permalink: this.perma_link,
    duration: this.duration,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user),
    facet_options: this.facet_options,
    context: this.context,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Post', PostSchema)