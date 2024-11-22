import express from 'express'
import dotenv from 'dotenv'
import routers from './routes/index.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const publicPath = path.join(__dirname, '../dist')
app.use(express.json())
app.use(express.static(publicPath))
app.use(routers)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})
const PORT = process.env.PORT || 6688

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
