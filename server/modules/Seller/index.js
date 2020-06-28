const { Seller, Appointment } = require('../../models')
const { CONSTANTS } = require('../../utils')

const { ERROR, SUCCESS } = CONSTANTS.MESSAGES
const {
  DATE_DIFFRENCE,
  APPOINTMENT_CONFLICT,
  APPOINTMENT_UPDATE,
  APPOINTMENT_DELETION
} = ERROR
const { APPOINTMENT_ADDED } = SUCCESS

module.exports = {
  sellers: async req => {
    const { search } = req.query
    let params = {}
    if (search) Object.assign(params, { name: new RegExp(search, 'i') })
    return await Seller.find(params)
  },
  appointments: async req => {
    const params = ({ sellerId } = req.params)
    const { status } = req.query
    if (status) Object.assign(params, { status })
    return await Appointment.find(params)
  },
  addAppointment: async req => {
    const { startDate, endDate, sellerId } = req.body

    if (new Date(startDate) >= new Date(endDate)) {
      throw new Error(DATE_DIFFRENCE)
    }

    const avalaibilityCheck = await Appointment.find({
      sellerId: sellerId,
      $or: [
        {
          $and: [
            { startDate: { $lte: new Date(startDate) } },
            { endDate: { $gte: new Date(startDate) } }
          ]
        },
        {
          $and: [
            { startDate: { $lte: new Date(endDate) } },
            { endDate: { $gte: new Date(endDate) } }
          ]
        },
        {
          $and: [
            { startDate: { $gte: new Date(startDate) } },
            { endDate: { $lte: new Date(endDate) } }
          ]
        }
      ]
    })
    if (avalaibilityCheck.length) {
      throw new Error(APPOINTMENT_CONFLICT)
    } else {
      const newAppointment = new Appointment({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        sellerId
      })
      await newAppointment.save()
      return {
        message: APPOINTMENT_ADDED
      }
    }
  },
  updateAppointment: async req => {
    const { id } = req.params
    const params = ({ status } = req.body)
    const response = await Appointment.findByIdAndUpdate(
      id,
      { $set: params },
      { new: true }
    )
    if (!response) {
      throw new Error(APPOINTMENT_UPDATE)
    }
    return response
  },
  deleteAppointment: async req => {
    const { id } = req.params
    const response = await Appointment.findByIdAndRemove(id)
    if (!response) {
      throw new Error(APPOINTMENT_DELETION)
    }
    return response
  }
}
