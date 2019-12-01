const express = require('express')
const validator = require('express-joi-validation').createValidator({})
const { userMiddleware } = require('../middleware')
const { users } = require('../../controller')
const { userSchema } = require('../schemas')

const route = express.Router()

module.exports = (app) => {
  app.use('/users', route) // Creating a user route

  route.post('/', validator.body(userSchema), userMiddleware.existUser, users.createUser)
}
