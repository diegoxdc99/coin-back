const express = require('express')
const auth = require('express-jwt')
const validator = require('express-joi-validation').createValidator({})
const config = require('../../config')
const { cryptoMiddleware } = require('../middleware')
// const { users } = require('../../controller')
const { cryptoSchema } = require('../schemas')

const route = express.Router()

module.exports = (app) => {
  app.use('/cryptos', route)

  route.post('/', auth(config.auth), validator.body(cryptoSchema), cryptoMiddleware.isValid)
}
