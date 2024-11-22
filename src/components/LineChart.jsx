import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Select from '@/components/Select'
import { months } from '@/assets/js/constant.js'

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
            { offset: 0, color: '#4DC39F' },
            { offset: 0.5, color: '#2B755E' },
            { offset: 1, color: 'rgba(50, 135, 109, 0)' }
          ])
        },
        waters: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#1B3586' },
            { offset: 1, color: 'rgba(53, 76, 148, 0)' }
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
          left: '0',
          right: '0',
          top: '40px',
          bottom: '0',
          containLabel: true
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
              color: '#98A1B733'
            }
          }
        },
        series: [
          {
            name: '蜥蜴总数',
            type: 'line',
            data,
            smooth: true,
            lineStyle: {
              color: lineColor[lineType],
              width: 2
            },
            symbol: 'none',
            areaStyle: areaStyle[lineType]
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
