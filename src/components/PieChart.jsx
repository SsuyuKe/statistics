import * as echarts from 'echarts'
import React, { useRef, useEffect, useState } from 'react'
import ChartLegend from '@/components/ChartLegend'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Pagination from '@/components/Pagination'

const ITEMS_PER_PAGE = 9

const PieChart = ({ data, title, className, showPercent }) => {
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
        { 'grid-cols-3': !showPercent },
        className
      )}
    >
      <div
        className={clsx('flex flex-col items-start', {
          'col-span-1': !showPercent
        })}
      >
        <div className="flex">
          <h3 className="mb-[52px] text-white text-xl font-bold mr-5">
            {title}
          </h3>
          {locationDataWithColor.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          )}
        </div>
        <div className="min-w-[240px] relative">
          <div className="min-h-[240px]" ref={chartRef} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <p className="text-white text-[40px] font-bold">{totalAmount}</p>
            <p className="text-[#6E788E] text-2xl">隻</p>
          </div>
        </div>
      </div>
      <div
        className={clsx('grid grid-cols-3 gap-x-10 gap-y-7', {
          'col-span-2 grid-cols-6': !showPercent
        })}
      >
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
              showPercent={showPercent}
            />
          ))}
      </div>
    </div>
  )
}

export default PieChart

PieChart.defaultProps = {
  showPercent: true
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      district: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  showPercent: PropTypes.bool
}
