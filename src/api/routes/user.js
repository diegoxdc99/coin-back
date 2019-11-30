const express = require('express')
const route = express.Router()

const { userMiddleware } = require('../middleware')
const { users } = require('../../controller')

module.exports = (app) => {
  app.use('/users', route) // Creating a user route

  route.post('/', userMiddleware.existUser, users.createUser)
}
