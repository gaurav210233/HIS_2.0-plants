-- CreateTable
CREATE TABLE "units" (
    "Id" TEXT NOT NULL,
    "plant_id" INTEGER NOT NULL,
    "log_id" SERIAL NOT NULL,
    "user_id" TEXT,
    "moisture_level" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "water_level" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE INDEX "units_plant_id_idx" ON "units"("plant_id");
