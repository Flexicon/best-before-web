import { connect, Schema, model } from 'mongoose'

const uri = process.env.MONGODB_URI
connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

// Schemas
const ProductSchema = Schema({ name: String, expiryDate: Date, createdBy: String })

ProductSchema.statics.findByUserID = function (id) {
  return this.find({ createdBy: id }).sort({ expiryDate: 1 })
}

ProductSchema.statics.serialize = function (product) {
  const { _id: id, name, expiryDate, createdBy } = product
  return { id, name, expiryDate, createdBy }
}

ProductSchema.methods.serialize = function () {
  return this.model('Product').serialize(this)
}

ProductSchema.methods.patch = function (params) {
  const allowedKeys = ['name', 'expiryDate']
  const attr = Object.fromEntries(Object.entries(params).filter(([k, v]) => allowedKeys.includes(k) && !!v))
  Object.assign(this, attr)

  return this
}

// Models
export const Product = model('Product', ProductSchema)
