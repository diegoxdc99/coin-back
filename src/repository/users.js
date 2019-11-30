module.exports = function setupAgent (UserModel) {
  const getByUsername = (username) => {
    return UserModel.findOne({
      where: {
        username
      }
    })
  }

  const createOne = (userParams) => {
    return UserModel.create(userParams)
  }

  return {
    getByUsername,
    createOne
  }
}
