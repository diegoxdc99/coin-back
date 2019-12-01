const axios = require('axios')

const db = require('../repository')
const { bravenewcoin, db: dbConfig } = require('../config')
const { ErrorHandler } = require('../helpers/error')

const url = 'https://bravenewcoin-v1.p.rapidapi.com/ticker'

const config = {
  headers: {
    'x-rapidapi-host': 'bravenewcoin-v1.p.rapidapi.com',
    'x-rapidapi-key': bravenewcoin.key
  }
}

const apiResponseError = {
  400: 'cryptocurrency not found',
  401: 'Could not log in to cryptocurrency api services',
  default: 'error trying to validate the cryptocurrency'
}

const isValid = async (coin) => {
  try {
    return await axios.get(`${url}?coin=${coin}`, config)
  } catch (error) {
    throw createResponseError(error.response)
  }
}

const createResponseError = (response) => {
  return new ErrorHandler(response.status, apiResponseError[response.status] || apiResponseError.default)
}

const createOne = async (userId, name) => {
  try {
    const { Cryptocurrencies } = await db(dbConfig)
    const cryptocurrency = await Cryptocurrencies.createOne(userId, { name })
    return cryptocurrency
  } catch (error) {
    return null
  }
}

module.exports = {
  isValid,
  createOne
}
