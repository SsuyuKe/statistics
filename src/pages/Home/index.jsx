import React from 'react'
import IconButton from '@/components/IconButton'
import PieChart from '@/components/PieChart'
import BarChart from '@/components/BarChart'
import LineChart from '@/components/LineChart'
import AnimalMap from '@/components/AnimalMap'
import MonitoringToggle from '@/components/MonitoringToggle'

const statisticsCards = [
  {
    icon: 'circles-three-plus',
    bgColor: '#43D1A7',
    title: '最新一期總數',
    number: '59'
  },
  {
    icon: 'calendar-dots',
    bgColor: '#9645EF',
    title: '與前三個月平均比較',
    number: '59'
  },
  {
    icon: 'iguana-white',
    bgColor: '#1F47E9',
    title: '公30cm以上幼蜥',
    number: '59'
  },
  {
    icon: 'iguana-white',
    bgColor: '#FF003C',
    title: '母30cm以上幼蜥',
    number: '59'
  }
]
const toggleMapModeOptions = [
  { label: '亮模式', value: 'lightMode' },
  { label: '暗模式', value: 'darkMode' }
]
const Home = () => {
  const handleToggleMapModeChange = (e) => {
    console.log(e)
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <PieChart />
        <div className="grid grid-cols-2 gap-3">
          {statisticsCards.map((item) => (
            <div
              key={item.title}
              className="rounded-[10px] bg-[#23252A] text-white pt-3 pl-3 relative">
              <IconButton
                name={item.icon}
                width={36}
                height={36}
                bgColor={item.bgColor}
                iconSize={24}
                className="rounded-[10px] mb-4"
              />
              <p className="text-white text-base">{item.title}</p>
              <div className="absolute right-4 bottom-4">
                <p className="text-7xl font-bold">{item.number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BarChart className="mb-4" />
      <LineChart />
      <div className="my-4 flex justify-end">
        <MonitoringToggle
          options={toggleMapModeOptions}
          onChange={handleToggleMapModeChange}
        />
      </div>
      <AnimalMap />
    </>
  )
}

export default Home
