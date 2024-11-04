import React from 'react'
import IconButton from '@/components/IconButton'
import { Outlet } from 'react-router-dom'

const pageButtons = ['iguana', 'monkey', 'bee']

const Layout = () => {
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
          <div></div>
        </header>
        <main className="flex-1 pl-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
