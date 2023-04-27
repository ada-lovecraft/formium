import test from 'ava'
import { id } from 'lamby-chan'
import {
  generateArray,
  generateSiteRecord,
  generateMaterialRecord,
} from '../prisma/seed-generator.js'
test('generateArray generates an array of given length', (t) => {
  const arr = generateArray(id, 10, null)
  t.log('arr')
  t.is(arr.length, 10, 'array length mismatch')
})

test('generateArray generates an array using given function', (t) => {
  const arr = generateArray((idx) => idx, 10, null)
  t.log('arr')
  t.deepEqual(arr, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 'array mismatch')
})

test('generateArray generates an array using given data ', (t) => {
  const arr = generateArray((idx, ctx) => ctx[idx], 10, [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
  ])
  t.log('arr')
  t.deepEqual(
    arr,
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    'array mismatch'
  )
})

test('generateSiteRecord produces a valid Site object', (t) => {
  const site = generateSiteRecord()
  t.is(typeof site, 'object', 'site is not an object')
  t.is(typeof site.data, 'object', 'site.data is not an object')
  t.is(typeof site.data.name, 'string', 'site.data.name is not a string')
  t.truthy(site.data.name, 'site.data.name is empty')
})

test('generateMaterialRecord produces a valid Material object', (t) => {
  const material = generateMaterialRecord(0, 1)
  t.is(typeof material, 'object', 'material is not an object')
  t.is(typeof material.data.siteId, 'number', 'siteId is not a number')
  t.is(typeof material.data.name, 'string', 'name is not a string')
  t.is(typeof material.data.amount, 'number', 'amount is not a number')
  t.is(typeof material.data.price, 'number', 'price is not a number')
  t.is(typeof material.data.color, 'string', 'color is not a string')
  t.is(
    typeof material.data.deliveryDate,
    'number',
    'deliveryDate is not a number'
  )
})

test('generateMaterialRecord produces a valid Material object with given siteId', (t) => {
  const material = generateMaterialRecord(0, 1)
  t.is(material.data.siteId, 1, 'siteId does not match given siteId')
})
