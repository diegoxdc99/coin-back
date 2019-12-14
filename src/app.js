const express = require('express')
const config = require('./config')

const logger = require('./helpers/logger')
let app

async function startServer () {
  app = express()
  await require('./loaders')(app) // Start the loaders configuration
  if (!module.parent) {
    app.listen(config.port, () => {
      logger.info(`Server started on the port ${config.port}`)
    })
  }
}

startServer()

module.exports = app
