import { PrismaClient } from '@prisma/client'
import {
  generateSiteRecords,
  generateSiteMaterialRecords,
} from './seed-generator.js'
import dotenv from 'dotenv'
import log from 'log-update'
import * as c from 'yoctocolors'
import debug from 'debug'
dotenv.config()

const dbg = debug('formium:seed')
const { SEED_SITE_COUNT, SEED_MAX_MATERIALS } = process.env

const prisma = new PrismaClient()

/**
 * @method seedSites
 * @description Seed the construction_site table
 * @param {number} siteCount : number of sites to generate
 * @returns [Object] : [{ id: number, name: string, createdAt: Date, updatedAt: Date }]
 */
const seedSites = async (siteCount = 10) => {
  const siteDocs = generateSiteRecords(siteCount)
  const sites = []
  for (const [idx, doc] of siteDocs.entries()) {
    dbg(`[${idx + 1}/${siteCount}] Inserting Site:`, doc.data.name)
    const site = await prisma.site.create(doc)
    sites.push(site)
  }

  return sites
}

/**
 * @method seedMaterials
 * @description Seed the construction_site_material table
 * @param [Object] sites : array of site records
 * @param {number} maxMaterials : max number of materials to generate per site
 * @returns [Object] : [{ id: number, siteId: number, name: string, amount: number, price: number, color: string, deliveryDate: number, createdAt: Date, updatedAt: Date }]
 */
async function seedMaterials(sites, maxMaterials = 10) {
  dbg(`Seeding upto ${maxMaterials} materials per site`)
  const materialDocs = generateSiteMaterialRecords(maxMaterials, sites)
  const materials = []
  for (const [idx, doc] of materialDocs.entries()) {
    dbg(
      `[${idx + 1}/${materialDocs.length}] Inserting Material: ${
        doc.data.siteId
      } -> ${doc.data.name}`
    )
    const material = await prisma.siteMaterial.create(doc)
    materials.push(material)
  }
  dbg(`[${materialDocs.length}/${materialDocs.length}] Materials created`)
  return materials
}

try {
  const sites = await seedSites(SEED_SITE_COUNT)
  dbg(`${sites.length} Sites created`)
  const materials = await seedMaterials(sites, SEED_MAX_MATERIALS)
  dbg(`${materials.length} Materials created`)
  await prisma.$disconnect()
} catch (err) {
  console.error(err)
  await prisma.$disconnect()
  process.exit(1)
}
