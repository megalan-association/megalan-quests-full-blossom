// I'm assuming this should eventually be what goes on index.tsx, but I'll wait
// until everyone is ready to replace the current index.tsx page before 
// copying the content over.

const Landing = () => {
  return (
    <div className="w-full h-full bg-[#FFE6EB]">
      <div className="hidden md:block">
        <div className="z-50 md:w-[768px] lg:w-[1024px] xl:w-[1280px] h-full py-8 mx-auto grid grid-cols-2">
          <div>
            <div className="relative w-[384px] h-[384px] left-[-48px] lg:w-[512px] lg:h-[512px] lg:left-[-64px] xl:w-[640px] xl:h-[640px] xl:left-[-80px] bg-gradient-to-b from-white to-[#FDB3C2] rounded-full">
              <div className="relative w-full right-[-48px] lg:right-[-64px] xl:right-[-80px] mx-auto md:py-36 lg:py-48 xl:py-64 ">
                <h1 className="font-heading font-bold text-[#9F6C48] text-4xl lg:text-5xl xl:text-6xl">MegaLAN</h1>
                <h2 className="font-heading font-bold text-[#794C2D] text-5xl lg:text-6xl xl:text-7xl">Full Blossom</h2>
              </div>
            </div>
          </div>
          <div>Links</div>
        </div>
      </div>
      
      <div className="md:hidden">

      </div>
    </div>
  )
}

export default Landing
