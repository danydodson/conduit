const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const slug = require('slug')
const User = mongoose.model('User')

const PhotoSchema = new Schema({
  slug: { type: String, lowercase: true, unique: true },
  //objectID: { type: String },
  public_id: { type: String, },
  //title: { type: String },
  url: { type: String },
  secure_url: { type: String },
  //description: { type: String },
  //content: { type: String },
  //image: { type: String },
  //category: { type: String, },
  //mediums: [{ type: String, }],
  //tags: [{ type: String }],
  //featured: { type: Boolean },
  //shareable: { type: Boolean },
  //allow_notes: { type: Boolean },
  //mature: { type: Boolean },
  //purchasable: { type: Boolean },
  //price: { type: String, default: null },
  //favoritesCount: { type: Number, default: 0 },
  //likes: [{ user: { type: Schema.Types.ObjectId, ref: 'User' } }],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  //notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
}, { timestamps: true })

PhotoSchema.plugin(uniqueValidator, { message: 'is already taken' })

PhotoSchema.pre('validate', function (next) {
  if (!this.slug) { this.slugify() } next()
})

PhotoSchema.methods.slugify = function () {
  this.slug = slug(this.public_id) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
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
    slug: this.slug,
    public_id: this.public_id,
    //title: this.title,
    url: this.url,
    secure_url: this.secure_url,
    //description: this.description,
    //content: this.content,
    //image: this.image,
    //category: this.category,
    //mediums: this.mediums,
    //tags: this.tags,
    //price: this.price,
    //favorited: user ? user.isFavorite(this._id) : false,
    //favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Photo', PhotoSchema)