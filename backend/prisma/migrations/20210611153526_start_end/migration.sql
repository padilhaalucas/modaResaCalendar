/*
  Warnings:

  - You are about to drop the column `datetime` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `endAt` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startAt" DATETIME NOT NULL,
    "endAt" DATETIME NOT NULL,
    "clientId" TEXT NOT NULL,
    "staffMemberId" TEXT NOT NULL,
    FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("staffMemberId") REFERENCES "StaffMember" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("clientId", "id", "staffMemberId") SELECT "clientId", "id", "staffMemberId" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
