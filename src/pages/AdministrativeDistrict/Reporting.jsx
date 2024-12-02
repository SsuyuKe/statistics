import React, { useEffect, useState } from 'react'
import useScrollRestore from '@/hooks/useScrollRestore'
import AnimalMap from '@/components/AnimalMap'
import PieChart from '@/components/PieChart'
import AnalysisCard from '@/components/AnalysisCard'
import {
  getBarChartDataForLocation,
  getBarChartDataAndSumByMonth,
  getPieChartData,
  getIguanaMapData
} from '@/assets/js/chartData.js'
import BarChartByMonth from '@/components/BarChartByMonth'
import BarChartByLocation from '@/components/BarChartByLocation'
import { catchStatusOptions, districtOptions } from '@/assets/js/constant.js'
import { useCatchStatusData } from '@/hooks/useCatchStatusData.js'
import { adApi } from '@/api/module/ad.js'

const Reporting = () => {
  const [pieChartData, setPieChartData] = useState([])
  const { catchData, nonCatchData } = useCatchStatusData()
  const [locationData, setLocationData] = useState({
    districts: [],
    total: []
  })
  const [lineData, setLineData] = useState([])
  const [mapData, setMapData] = useState({})
  const [isExpanded, setIsExpanded] = useState(false)
  const handleExpandChange = useScrollRestore(isExpanded)

  const handleMonthSelect = (e) => {
    console.log(e)
  }
  const getMonitor = async () => {
    const data = await adApi.getMonitor()
    setMapData(getIguanaMapData(data))
    setPieChartData(getPieChartData(data))
  }
  useEffect(() => {
    if (catchData.length && nonCatchData.length) {
      setLineData(getBarChartDataAndSumByMonth(catchData, nonCatchData))
      setLocationData(getBarChartDataForLocation(catchData, nonCatchData))
    }
  }, [catchData, nonCatchData])
  useEffect(() => {
    getMonitor()
  }, [])
  return (
    <>
      <div className="grid grid-cols-4 gap-3 mb-4">
        <PieChart
          title="累積各行政區總數"
          data={pieChartData}
          className="col-span-3"
          showPercent={false}
        />
        <div className="grid grid-cols-1 gap-3 col-span-1">
          <AnalysisCard
            iconName="circles-three-plus"
            iconBgColor="#43D1A7"
            title="最新一期總數"
          >
            <p className="text-7xl font-bold text-[#43D1A7CC]">59</p>
          </AnalysisCard>
          <AnalysisCard
            iconName="calendar-dots"
            iconBgColor="#9645EF"
            title="與前三個月平均比較"
          >
            <p className="text-7xl text-[#9645EFCC] flex items-center">
              <span className="text-[40px] mr-2">+</span>
              <span className="font-bold">56</span>
              <span className="text-3xl ml-1 self-end">%</span>
            </p>
          </AnalysisCard>
        </div>
      </div>
      <BarChartByLocation
        title="行政區"
        xAxisData={locationData.districts}
        data={locationData.total}
        className="mb-4"
      />
      <BarChartByMonth title="每個月總計" data={lineData} className="mb-4" />
      <BarChartByMonth
        title="行政區顯示"
        data={lineData}
        options={districtOptions}
        className="mb-4"
      />
      <AnimalMap
        colorType="green"
        data={mapData}
        isExpanded={isExpanded}
        onIsExpanded={(expanded) => {
          handleExpandChange(expanded)
          setIsExpanded(expanded)
        }}
        options={catchStatusOptions}
        onMonthChange={handleMonthSelect}
      />
    </>
  )
}

export default Reporting
