import express from 'express'
import { CreateLog, getUnitByPlantId, getUnitLogsLast12, getlogSql } from '../controllers/units/unit.controller.js'

const router = express.Router()


//!---------Unit Routes----------!//
// const Prefix = "/api/v1" ;

router.get(`/log`,getUnitByPlantId)
router.post(`/log`,CreateLog)
router.get("/log/last",getUnitLogsLast12)
router.get("/log/sql",getlogSql)





export default router