/*
  Warnings:

  - You are about to drop the `construction_sites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "construction_sites";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "construction_site" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "construction_site_material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "site_id" TEXT NOT NULL,
    "name" TEXT,
    "amount" REAL NOT NULL,
    "price" REAL NOT NULL,
    "color" TEXT NOT NULL,
    "deliveryDate" DATETIME,
    CONSTRAINT "construction_site_material_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "construction_site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
