/*
  Warnings:

  - A unique constraint covering the columns `[clientId,staffMemberId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment.clientId_staffMemberId_unique" ON "Appointment"("clientId", "staffMemberId");
