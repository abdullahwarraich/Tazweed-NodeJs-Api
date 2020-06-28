const mongoose = require('mongoose')
const { MONGO_DB_URL } = require('../../../config.json')

mongoose.Promise = global.Promise

mongoose.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection

db.on('error', () => {
  console.log('Unable to connect to db')
})

db.on('connected', () => {
  console.log('Database connected')
})

db.on('openUri', () => {
  console.log('Mongoose version: ' + db.version + '\nConnetion to db success.')
})

module.exports = db
