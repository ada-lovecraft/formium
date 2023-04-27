import express from 'express'
import dotenv from 'dotenv'
import debug from 'debug'
// Load env variables from .env file and add them to process.env
dotenv.config()
const dbg = debug('api:server')
// constants
const { API_PORT } = process.env

export const startServer = async (PORT = API_PORT) => {
  // Create express app
  const app = express()

  // Add middleware
  app.use(express.json())
  // Add routes
  app.get('/', (req, res) => {
    res.sendStatus(200)
  })

  return new Promise((resolve, reject) => {
    app.listen(API_PORT, () => {
      dbg(`listening on port ${API_PORT}`)
      resolve(app)
    })
  })
  // Start server
}
process.on('SIGINT', () => {
  dbg('Stopping server')
  app.close()
  process.exit()
})
