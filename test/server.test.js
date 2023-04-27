import test from 'ava'
import dotenv from 'dotenv'
import got from 'got'
import { startServer } from '../index.js'

dotenv.config()
const { API_PORT } = process.env
const API_URL = `http://localhost:${API_PORT}/`

const client = got.extend({
  prefixUrl: API_URL,
})

test.before(async (t) => {
  t.context.app = await startServer()
})

test('GET / returns 200', async (t) => {
  const response = await client.get()
  t.is(response.statusCode, 200)
  t.is(response.body, 'OK')
})
