import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import IconButton from '@/components/IconButton'
import ToggleButton from '@/components/ToggleButton'
import LocationSelect from '@/components/LocationSelect'
import SwitchButton from '@/components/SwitchButton'

const pageButtons = ['iguana', 'monkey', 'bee']

const togglePageOptions = [
  { label: '監測', value: 'Monitoring' },
  { label: '通報', value: 'Reporting' }
]
const locationOptions = [
  { value: '全部', label: '全部' },
  { value: '仁武區', label: '仁武區' },
  { value: '前金區', label: '前金區' },
  { value: '大寮區', label: '大寮區' }
]
const LayoutWithToggle = () => {
  const navigate = useNavigate()
  const [activeComponent, setActiveComponent] = useState('Monitoring')

  const handleLocationChange = (e) => {
    console.log(e)
  }
  return (
    <div className="flex px-5 pb-[54px] w-full">
      <aside className="h-screen pt-3">
        <div className="bg-[#23252A] w-20 py-3 rounded-xl flex flex-col items-center">
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
            <SwitchButton
              onClick={() => navigate('/waters')}
              className="mr-5"
              icon="administrative-district"
            >
              行政區
            </SwitchButton>
            <ToggleButton
              className="mr-5"
              options={togglePageOptions}
              onChange={(e) => setActiveComponent(e.target.value)}
            />
            <LocationSelect
              onChange={handleLocationChange}
              options={locationOptions}
            />
          </div>
        </header>
        <main className="flex-1 pl-4">
          <Outlet context={{ activeComponent }} />
        </main>
      </div>
    </div>
  )
}

export default LayoutWithToggle
