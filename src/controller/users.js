const userService = require('../services/user')

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createOne(req.body)
    if (!user) return next(new Error('user not created'))
    res.status(201).send('user created successfully')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser
}
