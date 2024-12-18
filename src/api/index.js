import axios from 'axios'

const server = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://main.d31rej3p03o8sv.amplifyapp.com/api'
      : '/api',
  timeout: 6000
})

export default server
