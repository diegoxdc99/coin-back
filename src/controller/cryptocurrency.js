const cryptoService = require('../services/cryptocurrency')
const { ErrorHandler } = require('../helpers/error')

const createUser = async (req, res, next) => {
  try {
    const cryptocurrency = await cryptoService.createOne(req.user.id, req.body.name)
    if (!cryptocurrency) return next(new ErrorHandler(500, 'the cryptocurrency could not be created'))
    res.status(201).send('cryptocurrency created successfully')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser
}
