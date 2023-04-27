import Chance from 'chance'
import { faker } from '@faker-js/faker'
import lamby from 'lamby-chan'
import debug from 'debug'

const dbg = debug('formium:generate')
const chance = new Chance()

/**
 * @method generateArray
 * @description Generate an array of length count using generatorFn
 * @param {number} count : number of elements to generate
 * @param {Function} generatorFn : function that generates each element
 * @param {any} context : data to pass to generatorFn
 * @returns [any]
 */

export const generateArray = lamby.curry((generatorFn, count, context) =>
  Array.from({ length: count }, (_, idx) => generatorFn(idx, context))
)

/**
 * @method generateSiteRecord
 * @description Generate a Site record
 * @returns {Object} : { data: { name: string } }
 */
export const generateSiteRecord = () => ({
  data: {
    name: faker.company.name(),
  },
})

/**
 * @method generateMaterialRecord
 * @description Generate a SiteMaterial record
 * @param {number} idx : index of material record
 * @param {number} siteId : id of site record
 * @returns {Object} : { data: { siteId: number, name: string, amount: number, price: number, color: string, deliveryDate: number } }
 */
export const generateMaterialRecord = (idx, siteId) => ({
  data: {
    siteId,
    name: faker.commerce.productName(),
    amount: chance.floating({ min: 200, max: 10000, fixed: 2 }),
    price: chance.floating({ min: 2.5, max: 100, fixed: 2 }),
    color: chance.color({ format: 'hex' }),
    deliveryDate: faker.date.soon(),
  },
})

/**
 * @method generateSiteRecords
 * @description Generate an array of Site records
 * @param {number} count : number of sites to generate
 * @returns [Object] : [{ data: { name: string } }]
 */
export const generateSiteRecords = (count) => {
  dbg('Generating %d sites', count)
  return generateArray(generateSiteRecord, count, null)
}

/**
 * @method generateSiteMaterials
 * @description Generate an array of SiteMaterial records
 * @param {number} count : number of materials to generate
 * @param {number} siteId : id of site referenced site record
 * @returns [Object] : [{ data: { siteId: number, name: string, amount: number, price: number, color: string, deliveryDate: number } }]
 */
export const generateSiteMaterials = (count, siteId) =>
  generateArray(generateMaterialRecord, count, siteId)

/**
 * @method generateSiteMaterialRecords
 * @description Generate an array of SiteMaterial records
 * @param {number} maxMaterials : max number of materials to generate per site
 * @param [Object] sites : array of site records
 * @returns [Object] : [{ data: { siteId: number, name: string, amount: number, price: number, color: string, deliveryDate: number } }]
 */
export const generateSiteMaterialRecords = (maxMaterials, sites) => {
  dbg('Generating up to %d material records per site', maxMaterials)
  const siteMaterialRecords = []
  for (const [idx, site] of sites.entries()) {
    const materialCount = chance.integer({ min: 0, max: maxMaterials })
    dbg(`[${idx}/${sites.length}] Generating ${materialCount} materials`)
    const materials = generateSiteMaterials(materialCount, site.id)
    siteMaterialRecords.push(...materials)
  }
  return siteMaterialRecords
}
