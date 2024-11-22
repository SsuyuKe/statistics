import React, { useEffect, useState } from 'react'
import AnimalMap from '@/components/AnimalMap'
import { adApi } from '@/api/module/ad.js'
import {
  getBarChartDataForLocation,
  getBarChartDataAndSumByMonth
} from '@/assets/js/chartData.js'
import BarChartByMonth from '@/components/BarChartByMonth'
import BarChartByLocation from '@/components/BarChartByLocation'
import { catchStatusOptions } from '@/assets/js/constant.js'

const Reporting = () => {
  const [catchData, setCatchData] = useState([])
  const [nonCatchData, setNonCatchData] = useState([])
  const [locationData, setLocationData] = useState({
    districts: [],
    total: []
  })
  const [lineData, setLineData] = useState([])
  const getNonCatch = async () => {
    const data = await adApi.getNonCatch()
    setNonCatchData(data)
  }
  const getCatch = async () => {
    const data = await adApi.getCatch()
    setCatchData(data)
  }
  useEffect(() => {
    if (catchData.length && nonCatchData.length) {
      setLineData(getBarChartDataAndSumByMonth(catchData, nonCatchData))
      setLocationData(getBarChartDataForLocation(catchData, nonCatchData))
    }
  }, [catchData, nonCatchData])
  const init = async () => {
    await getCatch()
    await getNonCatch()
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <BarChartByLocation
        title="行政區"
        xAxisData={locationData.districts}
        data={locationData.total}
        className="mb-4"
      />
      <BarChartByMonth title="每個月總計" data={lineData} className="mb-4" />
      <BarChartByMonth title="行政區顯示" data={lineData} className="mb-4" />
      <AnimalMap colorType="green" options={catchStatusOptions} />
    </>
  )
}

export default Reporting
