const supertest = require('supertest')
const app = require('../app')
const cryptoService = require('../services/cryptocurrency')

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhcmxvcyIsImlkIjoyLCJpYXQiOjE1NzYzNDkwNTAsImV4cCI6MTU3NjQzNTQ1MH0.56REMJUklQeZJ3ri1y5mISElsj9sx10phtqb_JfAArw'
let server
let agent

describe('Get coins', () => {
  beforeEach((done) => {
    server = app.listen(4000, (err) => {
      if (err) return done(err)
      agent = supertest.agent(server)
      done()
    })
  })

  afterEach((done) => {
    return server && server.close(done)
  })
  it('Get 200', async () => {
    jest.spyOn(cryptoService, 'findAllByUser').mockResolvedValue([{ name: 'AC' }])
    const response = await agent.get('/cryptos/me').set('Authorization', token).send()
    expect(response.body).toBeDefined()
    expect(response.status).toBe(200)
    expect(cryptoService.findAllByUser).toBeCalled()
  })

  it('Get 500', async () => {
    jest.spyOn(cryptoService, 'findAllByUser').mockRejectedValue(new Error('Async error'))
    const response = await agent.get('/cryptos/me').set('Authorization', token).send()
    expect(response.body).toBeDefined()
    expect(response.status).toBe(500)
    expect(cryptoService.findAllByUser).toBeCalled()
  })
})
