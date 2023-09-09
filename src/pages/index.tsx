import { type NextPage } from "next"
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"

const Landing: NextPage = () => {
  const links = [
    {
      href: "user/dashboard",
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
  const { data: sessionData } = useSession();
  
  return (<>
    <div className="w-full min-h-screen top-0 left-0 bg-[#FFE6EB]">
      <div className="w-[320px] lg:w-[720px] min-h-screen lg:grid lg:grid-cols-2 m-auto">
        <div className="relative w-[310px] h-[310px] py-8 lg:-top-8 m-auto">
          <Image src="/landing-branch-fade.png" alt="" width={240} height={180} className="block absolute z-20 left-0 top-20" />
          <Image src="/landing-branch-fade.png" alt="" width={240} height={180} className="block absolute -top-12 right-0 z-20 rotate-180" />
          <div className="relative w-[300px] h-[300px] m-auto bg-gradient-to-b from-white to-[#FDB3C2] rounded-full">
            <div className="relative w-full pl-12 py-28 z-30">
              <h1 className="z-30 font-heading font-bold text-[#9F6C48] text-3xl">MegaLAN</h1>
              <h2 className="z-30 font-heading font-bold text-brown text-4xl">Full Blossom</h2>
            </div>
          </div>
        </div>
        <div className="relative w-[320px] p-8 z-40 m-auto bg-gradient-to-b from-transparent via-20% via-[#FFE6EB] to-[#FFE6EB]">
          {links.map((link) => (
            <Link href={link.href} key={link.href} className="block my-8 p-[2px] bg-gradient-to-b from-[#FDB5C4] to-[#C58895] rounded-md">
              <div className="p-2 rounded-md bg-[#FED7DF] font-heading text-pink text-center font-bold text-xl">{link.name}</div>
            </Link>
          ))}
          <button className="block w-full my-8 p-[2px] bg-gradient-to-b from-[#FDB5C4] to-[#C58895] rounded-md">
            <div onClick={sessionData ? () => void signOut() : () => void signIn()} className="p-2 rounded-md bg-[#FED7DF] font-heading text-[#EA5873] text-center font-bold text-xl">
              {sessionData ? "Sign out" : "Sign in"}
            </div>
          </button>
        </div>
      </div>
    </div>
  </>)
}

export default Landing
