import React, { useEffect, useState } from 'react'
import AnimalMap from '@/components/AnimalMap'
import {
  getBarChartDataForLocation,
  getBarChartDataAndSumByMonth
} from '@/assets/js/chartData.js'
import BarChartByMonth from '@/components/BarChartByMonth'
import BarChartByLocation from '@/components/BarChartByLocation'
import { catchStatusOptions } from '@/assets/js/constant.js'
import { useCatchStatusData } from '@/hooks/useCatchStatusData.js'

const Reporting = () => {
  const { catchData, nonCatchData } = useCatchStatusData()
  const [locationData, setLocationData] = useState({
    districts: [],
    total: []
  })
  const [lineData, setLineData] = useState([])
  const handleMonthSelect = (e) => {
    console.log(e)
  }
  useEffect(() => {
    if (catchData.length && nonCatchData.length) {
      setLineData(getBarChartDataAndSumByMonth(catchData, nonCatchData))
      setLocationData(getBarChartDataForLocation(catchData, nonCatchData))
    }
  }, [catchData, nonCatchData])
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
      <AnimalMap
        colorType="green"
        options={catchStatusOptions}
        onMonthChange={handleMonthSelect}
      />
    </>
  )
}

export default Reporting
