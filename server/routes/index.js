const express = require('express')
const {
  sellers,
  appointments,
  addAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers')

const router = express.Router()

// server status check
router.get('/', async (req, res) => res.send({ response: 'ok' }).status(200))

router.get('/sellers', sellers)
router.get('/appointment/:sellerId', appointments)
router.post('/appointment', addAppointment)
router.put('/appointment/:id', updateAppointment)
router.delete('/appointment/:id', deleteAppointment)

module.exports = router
