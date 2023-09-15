import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Landing: NextPage = () => {
  const links = [
    {
      href: "leaderboard",
      name: "Leaderboard",
    },
    {
      href: "about-us",
      name: "About Us",
    },
  ];
  const { data: sessionData } = useSession();

  return (
    <>
      <div className="left-0 top-0 min-h-screen w-full bg-[#FFE6EB]">
        <div className="m-auto min-h-screen w-[320px] lg:grid lg:w-[720px] lg:grid-cols-2">
          <div className="relative m-auto h-[310px] w-[310px] py-8 lg:-top-8">
            <Image
              src="/landing-branch-fade.png"
              alt=""
              width={240}
              height={180}
              className="absolute left-0 top-20 z-20 block"
            />
            <Image
              src="/landing-branch-fade.png"
              alt=""
              width={240}
              height={180}
              className="absolute -top-12 right-0 z-20 block rotate-180"
            />
            <div className="relative m-auto h-[300px] w-[300px] rounded-full bg-gradient-to-b from-white to-[#FDB3C2]">
              <div className="relative z-30 w-full py-28 pl-12">
                <h1 className="z-30 font-heading text-3xl font-bold text-[#9F6C48]">
                  MegaLAN
                </h1>
                <h2 className="z-30 font-heading text-4xl font-bold text-brown">
                  Full Blossom
                </h2>
              </div>
            </div>
          </div>
          <div className="relative z-40 m-auto w-[320px] bg-gradient-to-b from-transparent via-[#FFE6EB] via-20% to-[#FFE6EB] p-8">
            {sessionData && sessionData.user && (
              <>
                {sessionData.user.type === "ADMIN" ? (
                  <Link
                    href={"/admin/dashboard"}
                    key={"dashboard"}
                    className="my-8 block rounded-md bg-gradient-to-b from-[#FDB5C4] to-[#C58895] p-[2px]"
                  >
                    <div className="rounded-md bg-[#FED7DF] p-2 text-center font-heading text-xl font-bold text-pink">
                      Admin Dashboard
                    </div>
                  </Link>
                ) : (
                  <Link
                    href={"/user/dashboard"}
                    key={"dashboard"}
                    className="my-8 block rounded-md bg-gradient-to-b from-[#FDB5C4] to-[#C58895] p-[2px]"
                  >
                    <div className="rounded-md bg-[#FED7DF] p-2 text-center font-heading text-xl font-bold text-pink">
                      Dashboard
                    </div>
                  </Link>
                )}
              </>
            )}
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="my-8 block rounded-md bg-gradient-to-b from-[#FDB5C4] to-[#C58895] p-[2px]"
              >
                <div className="rounded-md bg-[#FED7DF] p-2 text-center font-heading text-xl font-bold text-pink">
                  {link.name}
                </div>
              </Link>
            ))}
            <button className="my-8 block w-full rounded-md bg-gradient-to-b from-[#FDB5C4] to-[#C58895] p-[2px]">
              <div
                onClick={() => {
                  sessionData ? signOut() : signIn();
                }}
                className="rounded-md bg-[#FED7DF] p-2 text-center font-heading text-xl font-bold text-[#EA5873]"
              >
                {sessionData ? "Sign out" : "Sign in"}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
