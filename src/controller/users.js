const userService = require('../services/user')
const { ErrorHandler } = require('../helpers/error')

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createOne(req.body)
    if (!user) return next(new ErrorHandler(500, 'the user could not be created'))
    res.status(201).send('user created successfully')
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

module.exports = {
  createUser
}
