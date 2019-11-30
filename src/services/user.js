
const db = require('../repository')
const config = require('../config')

const getUser = async (username) => {
  const { User } = await db(config.db)
  return User.getByUsername(username)
}

const createOne = async (userFields) => {
  const { User } = await db(config.db)
  const user = await User.createOne(userFields)
  return user
}

module.exports = {
  getUser,
  createOne
}
