
const db = require('../repository')
const config = require('../config')

const getUser = async (username) => {
  const { User } = await db(config.db)
  return User.getByUsername(username)
}

module.exports = {
  getUser
}
