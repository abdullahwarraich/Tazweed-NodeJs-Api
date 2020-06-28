const mongoose = require('mongoose')
const { db } = require('../../services')

const Schema = mongoose.Schema

const sellerSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  detail: { type: String, required: true, max: 200 },
  contact: {
    email: { type: String },
    cellNumber: { type: Number }
  }
})

const Seller = mongoose.model('seller', sellerSchema)

module.exports = Seller
