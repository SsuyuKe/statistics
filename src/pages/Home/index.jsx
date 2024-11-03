import React from 'react'
import IconButton from '@/components/IconButton'
import PieChart from '@/components/PieChart'
import AnimalMap from '@/components/AnimalMap'

const pageButtons = ['iguana', 'monkey', 'bee']

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
const Home = () => {
  return (
    <div className="flex px-5 pb-[54px]">
      <aside className="w-20 h-screen pt-3 border border-white border-solid">
        <div className="bg-[#23252A] py-3 rounded-xl flex flex-col items-center">
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
        <header className="w-full h-[60px] pl-4 border border-white border-solid flex justify-between items-center">
          <div>
            <div></div>
            <h1 className="text-white font-bold text-2xl">綠鬣蜥捕獲統計</h1>
          </div>
          <div></div>
        </header>

        <main className="flex-1 pl-4 border border-white border-solid">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#23252A] py-6 px-7 rounded-[10px]">
              <h3 className="text-white text-xl font-bold">累積各行政區總數</h3>
              <PieChart />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {statisticsCards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[10px] bg-[#23252A] text-white pt-3 pl-3 h-[182px] relative"
                >
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
          <div className="bg-[#23252A] h-[200px] mb-4 rounded-[10px]"></div>
          <div className="bg-[#23252A] h-[200px] mb-4 rounded-[10px]"></div>
          <div className="h-[400px] rounded-[10px] overflow-hidden">
            <AnimalMap />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
