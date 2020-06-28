const seeder = require('mongoose-seed')
const { SELLER_LIST } = require('../utils')
const { MONGO_DB_URL } = require('../../config.json')

seeder.connect(MONGO_DB_URL, function () {
  seeder.loadModels(['./server/models/seller/index.js'])
  seeder.clearModels(['seller'], function () {
    seeder.populateModels(SELLER_LIST, function () {
      seeder.disconnect()
    })
  })
})
