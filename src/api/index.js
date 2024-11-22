import axios from 'axios'

const server = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? '/api' : '/',
  timeout: 6000
})

export default server
