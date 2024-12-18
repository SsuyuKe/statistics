import express from 'express'
import dotenv from 'dotenv'
import routers from './routes/index.js'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const publicPath = path.join(__dirname, '../dist')
app.use(cors())
app.use(express.json())
app.use('/api', routers)
app.use(express.static(publicPath))
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})
const PORT = 80
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`)
})
