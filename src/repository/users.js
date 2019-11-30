module.exports = function setupAgent (UserModel) {
  const getByUsername = (username) => {
    return UserModel.findOne({
      where: {
        username
      }
    })
  }

  const create = (userParams) => {
    return UserModel.create(userParams)
  }

  return {
    getByUsername,
    create
  }
}
