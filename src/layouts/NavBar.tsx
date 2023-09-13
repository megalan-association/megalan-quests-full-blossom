import { Menu } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { springTransition } from "~/utils/animations";

const NavBar = () => {
  const { data: sessionData } = useSession();

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

  return (
    <>
      <div className="fixed z-50 hidden h-fit w-full flex-row items-center justify-between bg-beige px-4 py-2 text-brown md:flex md:px-8">
        <Link href={"/"}>
          <Image
            alt="logo"
            src="/cherry-3.png"
            height={500}
            width={500}
            className="h-16 w-fit object-contain"
          />
        </Link>
        <div className="hidden h-full flex-row items-center py-2 focus:outline-none sm:space-x-3 md:flex lg:space-x-12 xl:space-x-24">
          {sessionData && sessionData.user && (
            <>
              {sessionData.user.type === "ADMIN" ? (
                <Link
                  href="/admin/dashboard"
                  key={"dashboard"}
                  className="group p-2 font-body text-2xl"
                >
                  Admin Dashboard
                  <span className="block h-0.5 w-0 transform bg-brown transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <Link
                  href="/user/dashboard"
                  key={"dashboard"}
                  className="group p-2 font-body text-2xl"
                >
                  Dashboard
                  <span className="block h-0.5 w-0 transform bg-brown transition-all duration-300 group-hover:w-full" />
                </Link>
              )}
            </>
          )}
          {links.map((link) => (
            <Link
              href={"/" + link.href}
              key={link.href}
              className="group p-2 font-body text-2xl"
            >
              {link.name}
              <span className="block h-0.5 w-0 transform bg-brown transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
        <div className="flex w-fit flex-row items-center space-x-4">
          {sessionData && sessionData.user && (
            <Link
              href="/user/settings"
              className="group flex w-full items-center space-x-2 rounded-xl bg-brown px-2 py-2 text-beige drop-shadow-lg "
            >
              <Image
                alt="pfp"
                src={sessionData.user.image ? sessionData.user.image : ""}
                width={150}
                height={150}
                className="h-8 w-8 rounded-lg object-cover"
              />
              <p className="hidden font-heading group-hover:block">
                {sessionData.user.name}
              </p>
            </Link>
          )}
          <button
            onClick={sessionData ? () => void signOut() : () => void signIn()}
            className="hidden h-fit rounded-xl bg-brown px-4 py-2 text-2xl text-beige drop-shadow-lg focus:outline-none md:block"
          >
            <p className="whitespace-nowrap font-body text-xl">
              {sessionData ? "Sign out" : "Sign in"}
            </p>
          </button>
        </div>
      </div>
      <Menu>
        {({ open }: { open: boolean }) => (
          <div
            className={`fixed z-50 flex h-fit w-full flex-col px-4 transition-all duration-150 md:hidden ${
              open ? "bg-brown text-beige" : "bg-beige text-brown"
            }`}
          >
            <div className="flex h-fit flex-row items-center justify-between">
              <Menu.Item key={"home"} href="/" as="a">
                <Image
                  alt="logo"
                  src="/cherry-3.png"
                  height={500}
                  width={500}
                  className="h-16 w-fit object-contain"
                />
              </Menu.Item>
              <div className="flex w-fit flex-row space-x-2">
                {sessionData && sessionData.user && (
                  <Link
                    href="/user/settings"
                    className={`flex w-full items-center space-x-2 rounded-xl px-2 py-2 drop-shadow-lg transition-all duration-150 ${
                      open ? "bg-beige text-brown" : "bg-brown text-beige"
                    }`}
                  >
                    {sessionData.user.image ? (
                      <Image
                        alt="pfp"
                        src={sessionData.user.image}
                        width={150}
                        height={150}
                        className="h-8 w-8 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="block h-8 w-8 rounded-lg" />
                    )}

                    {open && (
                      <motion.p
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: "auto",
                        }}
                        exit={{ width: 0 }}
                        transition={{
                          ...springTransition,
                        }}
                        className="whitespace-nowrap font-heading"
                      >
                        {sessionData.user.name}
                      </motion.p>
                    )}
                  </Link>
                )}
                <Menu.Button
                  className={`block h-fit rounded-xl p-2 text-2xl drop-shadow-lg transition-all duration-150 focus:outline-none md:hidden ${
                    open ? "bg-beige text-brown" : "bg-brown text-beige"
                  }`}
                >
                  <Bars3Icon
                    className={`h-8 w-8 transition-all duration-150 ${
                      open && "-rotate-90"
                    }`}
                  />
                </Menu.Button>
              </div>
            </div>
            <Menu.Items className="flex h-fit flex-col space-y-8 overflow-hidden px-4 py-4 focus:outline-none md:hidden">
              {sessionData && sessionData.user && (
                <motion.div
                  key={"dashboard"}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    ...springTransition,
                    delay: 0,
                  }}
                >
                  <Menu.Item>
                    {sessionData.user.type === "ADMIN" ? (
                      <Link
                        href="/admin/dashboard"
                        key={"dashboard"}
                        className="p-2 font-body text-3xl font-bold"
                      >
                        Admin Dashboard
                      </Link>
                    ) : (
                      <Link
                        href="/user/dashboard"
                        key={"dashboard"}
                        className="p-2 font-body text-3xl font-bold"
                      >
                        Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                </motion.div>
              )}
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    ...springTransition,
                    delay: (index + 1) / 10,
                  }}
                >
                  <Menu.Item key={link.href}>
                    <Link
                      href={"/" + link.href}
                      className="p-2 font-body text-3xl font-bold"
                    >
                      {link.name}
                    </Link>
                  </Menu.Item>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  ...springTransition,
                  delay: (links.length + 1) / 10,
                }}
              >
                <Menu.Item key="login">
                  <button
                    onClick={
                      sessionData ? () => void signOut() : () => void signIn()
                    }
                    className="p-2 font-body text-3xl font-bold"
                  >
                    {sessionData ? "Sign out" : "Sign in"}
                  </button>
                </Menu.Item>
              </motion.div>
            </Menu.Items>
          </div>
        )}
      </Menu>
    </>
  );
};
export default NavBar;
