import * as echarts from 'echarts'
import React, { useRef, useEffect, useState } from 'react'
import ChartLegend from '@/components/ChartLegend'
import SvgIcon from '@/components/SvgIcon'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const ITEMS_PER_PAGE = 9

const PieChart = ({ data, title, className }) => {
  const chartRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)
  const totalAmount = data.reduce((preVal, item) => preVal + item.amount, 0)
  const locationDataWithColor = data.map((item, index) => ({
    ...item,
    color: `hsl(${index * 40}, 70%, 50%)`,
    percentage: Math.floor((item.amount / totalAmount) * 100)
  }))

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    if (locationDataWithColor.length > 0) {
      // 確保資料存在
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
              value: item.amount,
              name: item.district,
              itemStyle: {
                color: item.color
              }
            })),
            animation: true
          }
        ]
      }
      chartInstance.setOption(option)
      const resizeListener = () => {
        chartInstance.resize()
      }

      window.addEventListener('resize', resizeListener)
      return () => {
        window.removeEventListener('resize', resizeListener)
        chartInstance.dispose()
      }
    }
  }, [locationDataWithColor])
  return (
    <div
      className={clsx(
        'grid grid-cols-2 bg-[#23252A] py-6 px-7 rounded-[10px]',
        className
      )}
    >
      <div className="flex flex-col items-start">
        <div className="flex">
          <h3 className="mb-[52px] text-white text-xl font-bold mr-5">
            {title}
          </h3>
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="bg-white rounded-full relative w-8 h-8 mr-2"
          >
            <SvgIcon
              name="arrow-left"
              width={10}
              height={8}
              className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
            />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="bg-white rounded-full relative w-8 h-8"
          >
            <SvgIcon
              name="arrow-right"
              width={10}
              height={8}
              className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
            />
          </button>
        </div>
        <div className="min-w-[240px] relative">
          <div className="min-h-[240px]" ref={chartRef} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <p className="text-white text-[40px] font-bold">{totalAmount}</p>
            <p className="text-[#6E788E] text-2xl">隻</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-10 gap-y-7">
        {locationDataWithColor
          .slice(
            currentPage * ITEMS_PER_PAGE,
            (currentPage + 1) * ITEMS_PER_PAGE
          )
          .map((item) => (
            <ChartLegend
              key={item.district}
              name={item.district}
              color={item.color}
              number={item.amount}
              percentage={item.percentage}
            />
          ))}
      </div>
    </div>
  )
}

export default PieChart

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      district: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ).isRequired,
  title: PropTypes.string,
  className: PropTypes.string
}
