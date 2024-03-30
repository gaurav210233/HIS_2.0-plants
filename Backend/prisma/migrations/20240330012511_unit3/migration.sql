/*
  Warnings:

  - The primary key for the `units` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "units" DROP CONSTRAINT "units_pkey",
ADD CONSTRAINT "units_pkey" PRIMARY KEY ("log_id");
