import { useEffect, useState } from 'react'
import { adApi } from '@/api/module/ad.js'

export const useCatchStatusData = () => {
  const [catchData, setCatchData] = useState([])
  const [nonCatchData, setNonCatchData] = useState([])

  const fetchData = async () => {
    const [catchResult, nonCatchResult] = await Promise.all([
      adApi.getCatch(),
      adApi.getNonCatch()
    ])
    setCatchData(catchResult)
    setNonCatchData(nonCatchResult)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { catchData, nonCatchData }
}
