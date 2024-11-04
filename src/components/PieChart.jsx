import React from 'react'
import * as echarts from 'echarts'
import { useRef, useEffect } from 'react'
import ChartLegend from '@/components/ChartLegend'

const locationData = [
  {
    location: '仁武區',
    count: 100
  },
  {
    location: '大樹區',
    count: 150
  },
  {
    location: '鳳山區',
    count: 150
  },
  {
    location: '前金區',
    count: 100
  },
  {
    location: '林園區',
    count: 150
  },
  {
    location: '彌陀區',
    count: 150
  },
  {
    location: '大寮區',
    count: 20
  },
  {
    location: '烏松區',
    count: 80
  },
  {
    location: '楠梓區',
    count: 100
  }
]

const total = locationData.reduce((preVal, item) => preVal + item.count, 0)

const locationDataWithColor = locationData.map((item, index) => ({
  ...item,
  color: `hsl(${index * 40}, 70%, 50%)`,
  percentage: Math.floor((item.count / total) * 100)
}))

const PieChart = () => {
  const chartRef = useRef(null)
  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current)
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        show: false
      },
      series: [
        {
          name: '统计',
          type: 'pie',
          radius: ['75%', '100%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderWidth: 10,
            borderRadius: 8,
            borderColor: '#23252A'
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          data: locationDataWithColor.map((item) => ({
            value: item.count,
            name: item.location,
            itemStyle: {
              color: item.color
            }
          })),
          animation: true
        }
      ]
    }

    chartInstance.setOption(option)

    window.addEventListener('resize', () => {
      chartInstance.resize()
    })

    return () => {
      window.removeEventListener('resize', () => {
        chartInstance.resize()
      })
      chartInstance.dispose()
    }
  }, [locationData])
  return (
    <div className="grid grid-cols-2 bg-[#23252A] py-6 px-7 rounded-[10px]">
      <div className="flex flex-col items-start">
        <h3 className="mb-[52px] text-white text-xl font-bold">
          累積各行政區總數
        </h3>
        <div className="min-w-[240px] relative">
          <div className="min-h-[240px]" ref={chartRef} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <p className="text-white text-[40px] font-bold">1000</p>
            <p className="text-[#6E788E] text-2xl">隻</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-10 gap-y-7">
        {locationDataWithColor.map((item) => (
          <ChartLegend
            key={item.location}
            name={item.location}
            color={item.color}
            number={item.count}
            percentage={item.percentage}
          />
        ))}
      </div>
    </div>
  )
}

export default PieChart
