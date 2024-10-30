import SvgIcon from '@/components/SvgIcon'

const Home = () => {
  return (
    <div className="flex px-5">
      <aside className="w-20 h-screen pt-3 border border-white border-solid">
        <div className="bg-[#23252A] py-3 rounded-xl flex flex-col items-center">
          <div className="w-8 h-[30px] rounded-xl relative bg-[#383838]">
            <SvgIcon
              name="turtle"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </aside>
      <div className="flex flex-col w-full">
        <header className="w-full h-[60px] border border-white border-solid flex justify-between items-center">
          <div>
            <div></div>
            <h1 className="text-white">綠鬣蜥捕獲統計</h1>
          </div>
          <div></div>
        </header>

        <main className="flex-1 border border-white border-solid">
          <div className="grid grid-cols-2">
            <div>
              <img src="your-image-url.jpg" alt="" />
            </div>
            <div className="grid grid-cols-2">
              <div>卡片 1</div>
              <div>卡片 2</div>
              <div>卡片 3</div>
              <div>卡片 4</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
