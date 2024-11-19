import mongoose from 'mongoose'

const monitorSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  maleLarge: {
    type: Number,
    required: true
  },
  femaleLarge: {
    type: Number,
    required: true
  },
  maleMedium: {
    type: Number,
    required: true
  },
  femaleMedium: {
    type: Number,
    required: true
  },
  juvenile: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Monitor', monitorSchema)
