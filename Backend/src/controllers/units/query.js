import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUnitByPlantIddb = async (id, plant_id) => {
  const results = await prisma.unit.findFirst({
    where: {
      PlantId: plant_id,
      Id: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return results;
};

export const CreateLogdb = async (req) => {
  const {
    id: Id,
    plant_id: PlantId,
    moisture_level: MoistureLevel,
    humidity: Humidity,
    temperature: Temperature,
    water_level: WaterLevel,
    motor_state: MotorState,
  } = req.body;
  const results = await prisma.unit.create({
    data: {
      Id,
      PlantId,
      MoistureLevel,
      Humidity,
      Temperature,
      WaterLevel,
      MotorState,
    },
  });
  return results;
};

export const addLogViaMqtt = async (req) => {
  const {
    Id,
    PlantId,
    UserId,
    Humidity,
    Temperature,
    MoistureLevel,
    WaterLevel,
    MotorState,
  } = req;
  if (Id === undefined) return null;

  const results = await prisma.unit.create({
    data: {
      Id,
      PlantId,
      UserId,
      MoistureLevel,
      Humidity,
      Temperature,
      WaterLevel,
      MotorState,
    },
  });
  return results;
};

export const getLogs = async () => {
  // const res = prisma.unit.findMany({
  //   where: {
  //     createdAt: {
  //       gte: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
  //     }
  //   },
  //   orderBy: {
  //     createdAt: 'asc'
  //   }
  // });
  const results = await prisma.unit.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
      }
    },
    distinct: ['createdAt'], // Ensure only one row per hour
    orderBy: {
      createdAt: 'asc'
    }
  });

//   const results = await prisma.$queryRaw`
//   SELECT *
//   FROM (
//     SELECT 
//       *,
//       ROW_NUMBER() OVER (PARTITION BY DATE_TRUNC('hour', "createdAt") ORDER BY "createdAt" ASC) AS row_number
//     FROM "units"
//     WHERE "createdAt" >= NOW() - INTERVAL '12 hours'
//   ) AS subquery
//   WHERE row_number = 1;
// `;

  return results;
};


export const logSql = async()=>{
    const results = await prisma.$queryRaw`
  SELECT *
  FROM (
    SELECT 
      *,
      ROW_NUMBER() OVER (PARTITION BY DATE_TRUNC('hour', "createdAt") ORDER BY "createdAt" ASC) AS row_number
    FROM "units"
    WHERE "createdAt" >= NOW() - INTERVAL '12 hours'
  ) AS subquery
  WHERE row_number = 1;
`;
return results

}