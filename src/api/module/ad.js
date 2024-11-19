import server from '@/api'

export const adApi = {
  getCatch: async () => {
    const { data } = await server.get('/administrativeDistrict/catch')
    return data
  },
  getNonCatch: async () => {
    const { data } = await server.get('/administrativeDistrict/nonCatch')
    return data
  },
  getMonitor: async () => {
    const { data } = await server.get('/administrativeDistrict/monitor')
    return data
  }
}
