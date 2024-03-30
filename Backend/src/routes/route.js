import express from 'express'
import { CreateLog, getUnitByPlantId, getUnitLogsLast12, killSwitch } from '../controllers/units/unit.controller.js'
import { getLogsAll } from '../controllers/units/query.js'

const router = express.Router()


//!---------Unit Routes----------!//
// const Prefix = "/api/v1" ;

router.get(`/log`,getUnitByPlantId)
router.post(`/log`,CreateLog)
router.get("/log/last",getUnitLogsLast12)
router.get("/log/all",getLogsAll)
// router.patch("/log/kill",killSwitch)





export default router