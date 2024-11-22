import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Select from '@/components/Select'

const months = [
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
        data: data.map((monthData) => monthData[index]), // 取得每月对应类别的数据
        itemStyle: {
          color: () => {
            const colors = [
              '#1F47E9',
              '#FF003C',
              '#3BE8FF',
              '#FF8AA6',
              '#A2A2A2'
            ]
            return colors[index % colors.length] // 按索引选择颜色
          },
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
      // 监听窗口变化，自动调整图表大小
      window.addEventListener('resize', () => {
        chartInstance.resize()
      })
      // 清理
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
