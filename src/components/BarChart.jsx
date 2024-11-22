import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Select from '@/components/Select'
import { months } from '@/assets/js/constant.js'

const categories = [
  '公-30cm以上',
  '母-30cm以上',
  '公-19-29cm',
  '母-19-29cm',
  '幼蜥'
]

const yearOptions = [
  { label: 2024, value: 2024 },
  { label: 2023, value: 2023 },
  { label: 2022, value: 2022 },
  { label: 2021, value: 2021 }
]

const COLORS = ['#1F47E9', '#FF003C', '#3BE8FF', '#FF8AA6', '#A2A2A2']

const BarChart = ({ data, className }) => {
  const chartRef = useRef(null)
  const handleSelectYear = (e) => {
    console.log(e)
  }
  useEffect(() => {
    if (data.length) {
      const chartInstance = echarts.init(chartRef.current)
      const series = categories.map((category, index) => ({
        name: category,
        type: 'bar',
        data: data.map((monthData) => monthData[index]),
        itemStyle: {
          color: () => COLORS[index % COLORS.length],
          borderRadius: [4, 4, 0, 0]
        }
      }))
      const option = {
        grid: {
          left: '0',
          right: '0',
          top: '60px',
          bottom: '0',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: categories,
          left: 'left',
          textStyle: {
            color: '#FFFFFF'
          },
          formatter: (name) => name,
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10
        },
        xAxis: {
          type: 'category',
          data: months
        },
        yAxis: {
          type: 'value',
          interval: 10,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#98A1B733'
            }
          }
        },
        series
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
    }
  }, [data])

  return (
    <div
      className={clsx('bg-[#23252A] rounded-[10px] p-5 relative', className)}
    >
      <Select
        options={yearOptions}
        onChange={handleSelectYear}
        className="absolute top-[20px] right-[20px] z-50"
      />
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  )
}

export default BarChart

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string
}
