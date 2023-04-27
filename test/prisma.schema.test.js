import test from 'ava'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getTableDDL(tableName) {
  const result =
    await prisma.$queryRaw`SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ${tableName};`
  return result[0]?.sql || null
}

test('construction_site table', async (t) => {
  const actual = await getTableDDL('construction_site')
  const expected = `CREATE TABLE "construction_site" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
)`
  t.truthy(actual, 'construction_site table not found')
  t.is(actual, expected, 'construction_site table DDL mismatch')
})

test('construction_site_material table', async (t) => {
  const actual = await getTableDDL('construction_site_material')
  const expected = `CREATE TABLE "construction_site_material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "site_id" TEXT NOT NULL,
    "name" TEXT,
    "amount" REAL NOT NULL,
    "price" REAL NOT NULL,
    "color" TEXT NOT NULL,
    "deliveryDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "construction_site_material_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "construction_site" ("id") ON DELETE CASCADE ON UPDATE CASCADE
)`
  t.truthy(actual, 'construction_site table not found')
  t.is(actual, expected, 'construction_site_material table DDL mismatch')
})
