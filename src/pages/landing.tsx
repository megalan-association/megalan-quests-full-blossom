import { type NextPage } from "next"

// I'm assuming this should eventually be what goes on index.tsx, but I'll wait
// until everyone is ready to replace the current index.tsx page before 
// copying the content over.

const Landing: NextPage = () => {
  return (
    <div className="w-full h-full bg-[#FFE6EB]">
      <div className="hidden md:block">
        <div className="z-50 md:w-[720px] h-full py-8 mx-auto grid grid-cols-2">
          <div>
            <div className="relative w-[360px] h-[360px] left-[-48px] bg-gradient-to-b from-white to-[#FDB3C2] rounded-full">
              <div className="relative w-full right-[-48px] mx-auto py-32">
                <h1 className="font-heading font-bold text-[#9F6C48] text-4xl">MegaLAN</h1>
                <h2 className="font-heading font-bold text-[#794C2D] text-5xl">Full Blossom</h2>
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
