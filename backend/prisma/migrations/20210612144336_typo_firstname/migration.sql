/*
  Warnings:

  - You are about to drop the column `firstname` on the `StaffMember` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `StaffMember` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StaffMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);
INSERT INTO "new_StaffMember" ("email", "id", "firstName", "lastName") SELECT "email", "id", "firstname", "lastName" FROM "StaffMember";
DROP TABLE "StaffMember";
ALTER TABLE "new_StaffMember" RENAME TO "StaffMember";
CREATE UNIQUE INDEX "StaffMember.email_unique" ON "StaffMember"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
