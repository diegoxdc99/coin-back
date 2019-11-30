const userService = require('../../services/user')

const existUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.body.username)
    if (user) return next(new Error('user already exists'))
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  existUser
}
