const axios = require('axios')

const db = require('../repository')
const { bravenewcoin, db: dbConfig } = require('../config')
const { ErrorHandler } = require('../helpers/error')

const url = 'https://bravenewcoin-v1.p.rapidapi.com/ticker'
const descendingOrder = 'DES'

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

const findAllByUser = async (userId) => {
  const { Cryptocurrencies } = await db(dbConfig)
  const cryptocurrencies = await Cryptocurrencies.findAllByUser(userId)
  return cryptocurrencies
}

const getDataCryptocurrency = async (cryptos, userCurrency) => {
  const promisesApi = []
  cryptos.forEach(crypto => {
    promisesApi.push(axios.get(`${url}?coin=${crypto.name}&show=${userCurrency}`, config))
  })
  const responsesApi = await Promise.all(promisesApi)
  const response = createResponse(responsesApi, userCurrency)
  return response
}

const createResponse = (responsesApi, userCurrency) => {
  const response = []
  responsesApi.forEach(createResponseArray(response, userCurrency))
  return response
}

const orderListbyPrice = (list, order = descendingOrder) => {
  return list.sort((a, b) => order === descendingOrder ? b.price - a.price : a.price - b.price)
}

const createResponseArray = (response, userCurrency) => {
  return (responseApi) => {
    if (responseApi.data.success) {
      response.push({
        name: userCurrency,
        price: responseApi.data.last_price,
        source: responseApi.data.source
      })
    }
  }
}

module.exports = {
  isValid,
  createOne,
  findAllByUser,
  getDataCryptocurrency,
  orderListbyPrice
}
