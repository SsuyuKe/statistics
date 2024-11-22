import express from 'express'
import asyncHandler from 'express-async-handler'
import Catch from '../data/adCatch.js'
import NonCatch from '../data/adNonCatch.js'
import Monitor from '../data/adMonitor.js'
import WatersAll from '../data/watersAll.js'

const router = express.Router()

router.get(
  '/administrativeDistrict/catch',
  asyncHandler(async (req, res) => {
    return res.json(Catch)
  })
)
router.get(
  '/administrativeDistrict/nonCatch',
  asyncHandler(async (req, res) => {
    return res.json(NonCatch)
  })
)
router.get(
  '/administrativeDistrict/monitor',
  asyncHandler(async (req, res) => {
    return res.json(Monitor)
  })
)
router.get(
  '/waters/all',
  asyncHandler(async (req, res) => {
    return res.json(WatersAll)
  })
)

export default router
