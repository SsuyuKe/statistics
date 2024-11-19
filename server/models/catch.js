import mongoose from 'mongoose'

const catchSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
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
  }
})

export default mongoose.model('Catch', catchSchema)
