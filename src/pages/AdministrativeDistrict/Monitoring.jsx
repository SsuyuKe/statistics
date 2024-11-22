import React, { useState, useEffect } from 'react'
import PieChart from '@/components/PieChart'
import BarChart from '@/components/BarChart'
import LineChart from '@/components/LineChart'
import AnimalMap from '@/components/AnimalMap'
import AnalysisCard from '@/components/AnalysisCard'
import { adApi } from '@/api/module/ad.js'
import {
  getPieChartData,
  getBarChartDataForIguana,
  getLineChartData
} from '@/assets/js/chartData.js'
import { monthOptions } from '@/assets/js/constant.js'

const Monitoring = () => {
  const [pieChartData, setPieChartData] = useState([])
  const [barChartData, setBarChartData] = useState([])
  const [lineChartData, setLineChartData] = useState([])

  const getMonitor = async () => {
    const data = await adApi.getMonitor()
    setPieChartData(getPieChartData(data))
    setBarChartData(getBarChartDataForIguana(data))
    setLineChartData(getLineChartData(data))
  }
  const handleMonthSelect = (e) => {
    console.log(e)
  }
  useEffect(() => {
    getMonitor()
  }, [])
  return (
    <>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <PieChart title="累積各行政區總數" data={pieChartData} />
        <div className="grid grid-cols-2 gap-3">
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
          <AnalysisCard
            iconName="iguana-white"
            iconBgColor="#1F47E9"
            title="公30cm以上幼蜥"
          >
            <p className="text-7xl font-bold text-[#555555]">0.70</p>
          </AnalysisCard>
          <AnalysisCard
            iconName="iguana-white"
            iconBgColor="#FF003C"
            title="母30cm以上幼蜥"
          >
            <p className="text-7xl font-bold text-[#555555]">0.70</p>
          </AnalysisCard>
        </div>
      </div>
      <BarChart data={barChartData} className="mb-4" />
      <LineChart
        data={lineChartData}
        className="mb-4"
        lineType="administrativeDistrict"
      />
      <AnimalMap
        colorType="red"
        options={monthOptions}
        onMonthChange={handleMonthSelect}
      />
    </>
  )
}

export default Monitoring
