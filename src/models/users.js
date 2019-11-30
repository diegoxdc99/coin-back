const Sequelize = require('sequelize')
const setupDatabase = require('../repository/db')

module.exports = function setupUserModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('users', {
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    lastname: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    currency: {
      type: Sequelize.ENUM('eur', 'usd', 'cop'),
      allowNull: false
    }
  })
}
