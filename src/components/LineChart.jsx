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
const yearOptions = [
  { label: 2024, value: 2024 },
  { label: 2023, value: 2023 },
  { label: 2022, value: 2022 },
  { label: 2021, value: 2021 }
]

const LineChart = ({ data, className, lineType }) => {
  const chartRef = useRef(null)
  const handleSelectYear = (e) => {
    console.log(e)
  }
  useEffect(() => {
    if (data.length) {
      const chartInstance = echarts.init(chartRef.current)
      const areaStyle = {
        administrativeDistrict: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#4DC39F' }, // 顶部颜色
            { offset: 0.5, color: '#2B755E' }, // 中间颜色
            { offset: 1, color: 'rgba(50, 135, 109, 0)' } // 底部透明色
          ])
        },
        waters: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#1B3586' }, // 从顶部开始的颜色
            { offset: 1, color: 'rgba(53, 76, 148, 0)' } // 底部透明色
          ])
        }
      }
      const lineColor = {
        administrativeDistrict: '#42A486',
        waters: '#6B8DF8'
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineType: 'line'
          }
        },
        grid: {
          left: '0', // 左边距
          right: '0', // 右边距
          top: '40px', // 上边距
          bottom: '0', // 下边距
          containLabel: true // 确保标签在图表边缘内
        },
        xAxis: {
          type: 'category',
          data: months,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#98A1B733'
            }
          },
          axisLabel: {
            color: '#98A1B7'
          }
        },
        yAxis: {
          type: 'value',
          interval: 20,
          axisLine: {
            lineStyle: {
              color: '#98A1B733'
            }
          },
          axisLabel: {
            color: '#98A1B7'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#98A1B733' // 设置y轴网格线颜色
            }
          }
        },
        series: [
          {
            name: '蜥蜴总数',
            type: 'line',
            data,
            smooth: true, // 线条平滑
            lineStyle: {
              color: lineColor[lineType], // 折线颜色
              width: 2
            },
            symbol: 'none', // 移除端点
            areaStyle: areaStyle[lineType]
          }
        ]
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
        onChange={handleSelectYear}
        options={yearOptions}
        className="absolute top-[20px] right-[20px]"
      />
      <p className="text-xl text-white font-bold text-center">總數</p>
      <div className="flex justify-center"></div>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  )
}

export default LineChart

LineChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  lineType: PropTypes.oneOf(['administrativeDistrict', 'waters']).isRequired
}
