const mongoose = require('mongoose')
const { db } = require('../../services')
const Schema = mongoose.Schema
const SchemaTypes = Schema.Types

const appointmentSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  sellerId: { type: SchemaTypes.ObjectId, ref: 'seller' },
  status: {
    type: String,
    enum: ['AVAILABLE', 'PENDING', 'REJECTED', 'ACCEPTED'],
    default: 'AVAILABLE'
  }
})

const Appointment = mongoose.model('appointment', appointmentSchema)

module.exports = Appointment
