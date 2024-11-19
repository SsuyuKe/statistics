import express from 'express'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import Catch from './models/catch.js'
import NonCatch from './models/nonCatch.js'
import Monitor from './models/monitor.js'
import WatersAll from './models/watersAll.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 6688

app.get(
  '/administrativeDistrict/catch',
  asyncHandler(async (req, res) => {
    const data = await Catch.find({})
    return res.json(data)
  })
)
app.get(
  '/administrativeDistrict/nonCatch',
  asyncHandler(async (req, res) => {
    const data = await NonCatch.find({})
    return res.json(data)
  })
)
app.get(
  '/administrativeDistrict/monitor',
  asyncHandler(async (req, res) => {
    const data = await Monitor.find({})
    return res.json(data)
  })
)
app.get(
  '/waters/all',
  asyncHandler(async (req, res) => {
    const data = await WatersAll.find({})
    return res.json(data)
  })
)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
