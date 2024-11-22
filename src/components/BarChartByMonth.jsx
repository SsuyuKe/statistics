import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Select from '@/components/Select'

const CATEGORIES = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月'
]
const LEGENDS = ['捕抓', '未捕抓']

const COLORS = ['#43D1A7', '#FF003C']
const yearOptions = [
  { label: 2024, value: 2024 },
  { label: 2023, value: 2023 },
  { label: 2022, value: 2022 },
  { label: 2021, value: 2021 }
]

const BarChartByMonth = ({ data, className, title = '' }) => {
  const chartRef = useRef(null)
  const handleSelectYear = (e) => {
    console.log(e)
  }
  useEffect(() => {
    if (data.length) {
      const chartInstance = echarts.init(chartRef.current)
      const series = LEGENDS.map((legend, index) => ({
        name: legend,
        type: 'bar',
        data: CATEGORIES.map((_, idx) => {
          return data[idx] && data[idx][index] ? data[idx][index] : 0
        }),
        itemStyle: {
          color: COLORS[index],
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
          data: LEGENDS,
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
          data: CATEGORIES
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}' // Y轴显示实际的数值
          },
          interval: 20,
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
      {title && (
        <p className="text-xl text-white font-bold text-center">{title}</p>
      )}
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  )
}

export default BarChartByMonth

BarChartByMonth.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  xAxisData: PropTypes.array,
  className: PropTypes.string
}
