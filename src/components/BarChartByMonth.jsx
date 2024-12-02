import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Select from '@/components/Select'
import { months, yearOptions } from '@/assets/js/constant.js'

const LEGENDS = ['捕抓', '未捕抓']
const COLORS = ['#43D1A7', '#FF003C']

const BarChartByMonth = ({ data, className, title = '', options }) => {
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
        data: months.map((_, idx) => {
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
          data: months
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
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
        options={options || yearOptions}
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
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
    })
  )
}
