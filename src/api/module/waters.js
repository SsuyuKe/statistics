import server from '@/api'

export const watersApi = {
  getWaters: async () => {
    const { data } = await server.get('/waters/all')
    return data
  }
}
