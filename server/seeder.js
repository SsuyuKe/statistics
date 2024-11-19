import connectDB from './config/db.js'
import Catch from './models/catch.js'
import NonCatch from './models/nonCatch.js'
import Monitor from './models/monitor.js'
import WatersAll from './models/watersAll.js'

import adCatch from './data/adCatch.js'
import adNonCatch from './data/adNonCatch.js'
import adMonitor from './data/adMonitor.js'
import watersAll from './data/watersAll.js'

connectDB()

const deleteData = async () => {
  try {
    await Catch.deleteMany()
    await NonCatch.deleteMany()
    await Monitor.deleteMany()
    await WatersAll.deleteMany()
    console.log('data is deleted.')
  } catch (error) {
    console.log(error)
  }
}

const importSeedData = async () => {
  try {
    await deleteData()
    await Catch.insertMany(adCatch)
    await NonCatch.insertMany(adNonCatch)
    await Monitor.insertMany(adMonitor)
    await WatersAll.insertMany(watersAll)
    console.log('seed data is done.')
  } catch (error) {
    console.log(error)
  }
}

importSeedData()
