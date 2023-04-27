/*
  Warnings:

  - You are about to drop the column `deliveryDate` on the `construction_site_material` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `construction_site_material` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_construction_site_material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "site_id" TEXT NOT NULL,
    "name" TEXT,
    "amount" REAL NOT NULL,
    "price" REAL NOT NULL,
    "color" TEXT NOT NULL,
    "delivery_date" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "construction_site_material_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "construction_site" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_construction_site_material" ("amount", "color", "id", "name", "price", "site_id") SELECT "amount", "color", "id", "name", "price", "site_id" FROM "construction_site_material";
DROP TABLE "construction_site_material";
ALTER TABLE "new_construction_site_material" RENAME TO "construction_site_material";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
