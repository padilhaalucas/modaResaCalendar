/*
  Warnings:

  - A unique constraint covering the columns `[brandName]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `StaffMember` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StaffMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);
INSERT INTO "new_StaffMember" ("firstname", "id", "lastName") SELECT "firstname", "id", "lastName" FROM "StaffMember";
DROP TABLE "StaffMember";
ALTER TABLE "new_StaffMember" RENAME TO "StaffMember";
CREATE UNIQUE INDEX "StaffMember.email_unique" ON "StaffMember"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Client.brandName_unique" ON "Client"("brandName");
