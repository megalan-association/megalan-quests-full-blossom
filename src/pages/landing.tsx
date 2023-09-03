import { type NextPage } from "next"

// I'm assuming this should eventually be what goes on index.tsx, but I'll wait
// until everyone is ready to replace the current index.tsx page before 
// copying the content over.

const Landing: NextPage = () => {
  return (<>
    <div className="absolute w-full h-full top-0 left-0 -z-50 bg-[#FFE6EB]"></div>
    <div className="w-[320px] h-full py-8 mx-auto">
      <div className="relative w-[320px] h-[320px] left-[-40px] bg-gradient-to-b from-white to-[#FDB3C2] rounded-full">
        <div className="relative w-full right-[-40px] mx-auto py-28">
          <h1 className="font-heading font-bold text-[#9F6C48] text-3xl">MegaLAN</h1>
          <h2 className="font-heading font-bold text-[#794C2D] text-4xl">Full Blossom</h2>
        </div>
      </div>
    </div>
  </>)
}

export default Landing
