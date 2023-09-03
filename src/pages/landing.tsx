import { type NextPage } from "next"
import Image from "next/image"
import Link from "next/link"


// I'm assuming this should eventually be what goes on index.tsx, but I'll wait
// until everyone is ready to replace the current index.tsx page before 
// copying the content over.

const Landing: NextPage = () => {
  const links = [
    {
      href: "dashboard",
      name: "Dashboard",
    },
    {
      href: "leaderboard",
      name: "Leaderboard",
    },
    {
      href: "about-us",
      name: "About Us",
    },
  ]
  
  return (<>
    <div className="fixed w-full h-full top-0 left-0 -z-50 bg-[#FFE6EB]"></div>
    <div className="relative w-[320px] h-[320px] py-8 m-auto">
      <Image src="/landing-branch-fade.png" alt="" width={240} height={180} className="block absolute z-20 left-0 top-20" />
      <Image src="/landing-branch-fade.png" alt="" width={240} height={180} className="block absolute -top-12 right-0 z-20 rotate-180" />
      <div className="relative w-[300px] h-[300px] m-auto bg-gradient-to-b from-white to-[#FDB3C2] rounded-full">
        <div className="relative w-full pl-12 py-28 z-30">
          <h1 className="z-30 font-heading font-bold text-[#9F6C48] text-3xl">MegaLAN</h1>
          <h2 className="z-30 font-heading font-bold text-[#794C2D] text-4xl">Full Blossom</h2>
        </div>
      </div>
    </div>
    <div className="relative w-[320px] p-8 z-40 m-auto bg-gradient-to-b from-transparent via-20% via-[#FFE6EB] to-[#FFE6EB]">
      {links.map((link) => (
        <Link href={link.href} key={link.href} className="block my-8 p-[2px] bg-gradient-to-b from-[#FDB5C4] to-[#C58895] rounded-md">
          <div className="p-2 rounded-md bg-[#FED7DF] font-heading text-[#EA5873] text-center font-bold text-xl">{link.name}</div>
        </Link>
      ))}
      <button className="block w-full my-8 p-[2px] bg-gradient-to-b from-[#FDB5C4] to-[#C58895] rounded-md">
        <div className="p-2 rounded-md bg-[#FED7DF] font-heading text-[#EA5873] text-center font-bold text-xl">Login / sign up</div>
      </button>
    </div>
  </>)
}

export default Landing
