import React from 'react'
import * as echarts from 'echarts'
import { useRef, useEffect } from 'react'

const data = [
  { name: 'A', value: 335 },
  { name: 'B', value: 310 },
  { name: 'C', value: 234 },
  { name: 'D', value: 135 },
  { name: 'E', value: 148 },
  { name: 'F', value: 135 },
  { name: 'G', value: 148 },
  { name: 'H', value: 135 },
  { name: 'I', value: 148 }
]

const PieChart = () => {
  const chartRef = useRef(null)
  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current)
    const total = data.reduce((sum, item) => sum + item.value, 0)

    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        formatter: (name) => {
          const item = data.find((d) => d.name === name)
          const percentage = ((item.value / total) * 100).toFixed(2)
          return `${name}: ${item.value} (${percentage}%)`
        },
        icon: 'circle'
      },
      series: [
        {
          name: '统计',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
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
          data: data.map((item, index) => ({
            value: item.value,
            name: item.name,
            itemStyle: {
              color: `hsl(${index * 40}, 70%, 50%)` // 生成不同的颜色
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
  }, [data])
  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
}

export default PieChart
