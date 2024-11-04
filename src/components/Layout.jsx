import React from 'react'
import IconButton from '@/components/IconButton'
import { Outlet } from 'react-router-dom'
import MonitoringToggle from '@/components/MonitoringToggle'
import LocationSelect from '@/components/LocationSelect'
import SwitchButton from '@/components/SwitchButton'

const pageButtons = ['iguana', 'monkey', 'bee']

const togglePageOptions = [
  { label: '監測', value: '監測' },
  { label: '通報', value: '通報' }
]
const locationOptions = [
  { value: '全部', label: '全部' },
  { value: '仁武區', label: '仁武區' },
  { value: '前金區', label: '前金區' },
  { value: '大寮區', label: '大寮區' }
]

const Layout = () => {
  const handleTogglePageChange = (e) => {
    console.log(e)
  }
  const handleLocationChange = (value) => {
    console.log(`selected ${value}`)
  }
  const handleSwitchLocation = (e) => {
    console.log(e)
  }
  return (
    <div className="flex px-5 pb-[54px] w-full">
      <aside className="w-20 h-screen pt-3">
        <div className="bg-[#23252A] w-full py-3 rounded-xl flex flex-col items-center">
          {pageButtons.map((item) => (
            <IconButton
              className="mb-4 last:mb-0"
              key={item}
              name={item}
              bgColor="#383838"
            />
          ))}
        </div>
      </aside>
      <div className="flex flex-col w-full">
        <header className="w-full h-[60px] pl-4 flex justify-between items-center">
          <div>
            <h1 className="text-white font-bold text-2xl">綠鬣蜥捕獲統計</h1>
          </div>
          <div className="flex items-center">
            <SwitchButton onClick={handleSwitchLocation} className="mr-5">
              行政區
            </SwitchButton>
            <MonitoringToggle
              className="mr-5"
              options={togglePageOptions}
              onChange={handleTogglePageChange}
            />
            <LocationSelect
              onChange={handleLocationChange}
              options={locationOptions}
            />
          </div>
        </header>
        <main className="flex-1 pl-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
