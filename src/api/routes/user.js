const express = require('express')
const route = express.Router()

// const { isAuth } = require('../middleware')
// const { users } = require('../../controller')

module.exports = (app) => {
  app.use('/users', route) // Creating a user route
}
