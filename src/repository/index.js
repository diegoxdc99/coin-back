const setupDatabase = require('./db')
const setupUserModel = require('../models/users')
const setupUser = require('./users')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const UserModel = setupUserModel(config)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const User = setupUser(UserModel)

  return {
    User
  }
}
