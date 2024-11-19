import React, { useState, useEffect } from 'react'
import PieChart from '@/components/PieChart'
import BarChart from '@/components/BarChart'
import LineChart from '@/components/LineChart'
import AnimalMap from '@/components/AnimalMap'
import AnalysisCard from '@/components/AnalysisCard'

import { adApi } from '@/api/module/ad.js'

const Monitoring = () => {
  const [chartData, setChartData] = useState([])
  const getCatch = async () => {
    const data = await adApi.getCatch()
    const formattedData = {}
    for (const item of data) {
      if (formattedData[item.district]) {
        formattedData[item.district] += item.amount
      } else {
        formattedData[item.district] = item.amount
      }
    }
    setChartData(
      Object.entries(formattedData).map((item) => ({
        district: item[0],
        amount: item[1]
      }))
    )
  }
  const getNonCatch = async () => {
    const data = await adApi.getNonCatch()
    console.log(data)
    // const formattedData = {}
    // for (const item of data) {
    //   if (formattedData[item.location]) {
    //     formattedData[item.location] += item.amount
    //   } else {
    //     formattedData[item.location] = item.amount
    //   }
    // }
    // setChartData(
    //   Object.entries(formattedData).map((item) => ({
    //     location: item[0],
    //     amount: item[1]
    //   }))
    // )
  }
  const getMonitor = async () => {
    const data = await adApi.getMonitor()
    console.log(data)

    // data.for
    // {
    //   maleLarge: {
    //     type: Number,
    //     required: true
    //   },
    //   femaleLarge: {
    //     type: Number,
    //     required: true
    //   },
    //   maleMedium: {
    //     type: Number,
    //     required: true
    //   },
    //   femaleMedium: {
    //     type: Number,
    //     required: true
    //   },
    //   juvenile: {
    //     type: Number,
    //     required: true
    //   }
    // }
  }
  useEffect(() => {
    getCatch()
    getNonCatch()
    getMonitor()
  }, [])
  return (
    <>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <PieChart title="累積各行政區總數" data={chartData} />
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
      <BarChart className="mb-4" />
      <LineChart className="mb-4" lineType="administrativeDistrict" />
      <AnimalMap />
    </>
  )
}

export default Monitoring
