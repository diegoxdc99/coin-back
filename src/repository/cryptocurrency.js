module.exports = function setupCryptocurrencies (CryptocurrenciesModel) {
  const createOne = (userId, currencyParams) => {
    return CryptocurrenciesModel.create(
      {
        userId,
        name: currencyParams.name
      })
  }

  return {
    createOne
  }
}
