const supertest = require('supertest')
const app = require('../app')
const cryptoService = require('../services/cryptocurrency')

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhcmxvcyIsImlkIjoyLCJpYXQiOjE1NzYzNDkwNTAsImV4cCI6MTU3NjQzNTQ1MH0.56REMJUklQeZJ3ri1y5mISElsj9sx10phtqb_JfAArw'
const tokenNotFound = {
  status: 'error',
  statusCode: 401,
  message: 'No authorization token was found'
}
let server
let agent

jest.mock('../repository/cryptocurrency', () => {
  return () => {
    return {
      findAllByUser: jest.fn().mockResolvedValueOnce([{ name: 'ANC' }])
    }
  }
})

// jest.unmock('../repository/cryptocurrency')

describe('Get coins', () => {
  beforeAll((done) => {
    server = app.listen(4000, (err) => {
      if (err) return done(err)
      agent = supertest.agent(server)
      done()
    })
  })

  afterAll((done) => {
    return server && server.close(done)
  })
  it('Get 200', async () => {
    const response = await agent.get('/cryptos/me').set('Authorization', token).send()
    console.log('response.body 1 :', response.body)
    expect(response.body).toBeDefined()
    expect(response.status).toBe(200)
  })

  it('Get 500', async () => {
    jest.spyOn(cryptoService, 'findAllByUser').mockRejectedValue(new Error('Async error'))
    const response = await agent.get('/cryptos/me').set('Authorization', token).send()
    expect(response.body).toBeDefined()
    expect(response.status).toBe(500)
    expect(cryptoService.findAllByUser).toBeCalled()
  })

  it('Get 401 without token authorization', async () => {
    const response = await agent.get('/cryptos/me').send()
    console.log('response.body :', response.body)
    expect(response.body).toBeDefined()
    expect(response.body).toStrictEqual(tokenNotFound)
    expect(response.status).toBe(401)
  })
})
