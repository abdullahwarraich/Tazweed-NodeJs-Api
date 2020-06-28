const {
  sellers,
  appointments,
  addAppointment,
  updateAppointment,
  deleteAppointment
} = require('../../modules')
const { CONSTANTS } = require('../../utils')

const { BAD_REQUEST } = ({ ERROR } = CONSTANTS.MESSAGES)

module.exports = {
  sellers: async (req, res) => {
    try {
      const response = await sellers(req)
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send(BAD_REQUEST)
    }
  },
  appointments: async (req, res) => {
    try {
      const response = await appointments(req)
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send({
        message: error && error.message ? error.message : BAD_REQUEST
      })
    }
  },
  addAppointment: async (req, res) => {
    try {
      const added = await addAppointment(req)
      res.status(200).send(added)
    } catch (error) {
      res.status(400).send({
        message: error && error.message ? error.message : BAD_REQUEST
      })
    }
  },
  updateAppointment: async (req, res) => {
    try {
      const updated = await updateAppointment(req)
      res.status(200).send(updated)
    } catch (error) {
      res.status(400).send({
        message: error && error.message ? error.message : BAD_REQUEST
      })
    }
  },
  deleteAppointment: async (req, res) => {
    try {
      const deleted = await deleteAppointment(req)
      res.status(200).send(deleted)
    } catch (error) {
      res.status(400).send({
        message: error && error.message ? error.message : BAD_REQUEST
      })
    }
  }
}
