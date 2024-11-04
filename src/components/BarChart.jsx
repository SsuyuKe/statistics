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

const BarChart = ({ className }) => {
  const chartRef = useRef(null)
  const handleSelectYear = (e) => {
    console.log(e)
  }

  useEffect(() => {
    const myChart = echarts.init(chartRef.current)

    const data = [
      [5, 10, 3, 2, 8], // 1月
      [6, 9, 2, 4, 7], // 2月
      [7, 12, 1, 3, 9], // 3月
      [8, 15, 5, 2, 10], // 4月
      [6, 11, 4, 6, 8], // 5月
      [5, 10, 3, 4, 9], // 6月
      [6, 13, 2, 5, 7], // 7月
      [8, 14, 4, 3, 6], // 8月
      [7, 12, 5, 6, 8], // 9月
      [9, 15, 6, 4, 10], // 10月
      [10, 17, 8, 5, 12], // 11月
      [12, 20, 7, 8, 15] // 12月
    ]

    const series = categories.map((category, index) => ({
      name: category,
      type: 'bar',
      data: data.map((monthData) => monthData[index]), // 取得每月对应类别的数据
      itemStyle: {
        color: () => {
          const colors = ['#1F47E9', '#FF003C', '#3BE8FF', '#FF8AA6', '#A2A2A2']
          return colors[index % colors.length] // 按索引选择颜色
        },
        borderRadius: [4, 4, 0, 0]
      }
    }))

    const option = {
      grid: {
        left: '0', // 左边距
        right: '0', // 右边距
        top: '60px', // 上边距
        bottom: '0', // 下边距
        containLabel: true // 确保标签在图表边缘内
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: categories,
        left: 'left',
        textStyle: {
          color: '#FFFFFF' // 设置图例文本颜色为白色
        },
        formatter: function (name) {
          return name // 设置图例为圆形并添加圆形
        },
        icon: 'circle', // 设置图例的形状为圆形
        itemWidth: 10, // 设置圆形的宽度
        itemHeight: 10 // 设置圆形的高度
      },
      xAxis: {
        type: 'category',
        data: months
      },
      yAxis: {
        type: 'value',
        max: 20,
        min: 2,
        interval: 2,
        minInterval: 2,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#98A1B733' // 设置y轴网格线颜色
          }
        }
      },
      series
    }

    myChart.setOption(option)

    // 监听窗口变化，自动调整图表大小
    window.addEventListener('resize', () => {
      myChart.resize()
    })

    // 清理
    return () => {
      window.removeEventListener('resize', () => {
        myChart.resize()
      })
      myChart.dispose()
    }
  }, [])

  return (
    <div
      className={clsx('bg-[#23252A] rounded-[10px] p-5 relative', className)}>
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
  className: PropTypes.string
}
