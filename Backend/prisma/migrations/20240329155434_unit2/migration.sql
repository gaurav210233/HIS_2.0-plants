/*
  Warnings:

  - Added the required column `motor_state` to the `units` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "units" ADD COLUMN     "motor_state" DOUBLE PRECISION NOT NULL;
