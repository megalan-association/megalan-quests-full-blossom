import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const links = [
    {
      href: "/user/dashboard",
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
    {
      href: "/auth/login",
      name: "Login / Sign up",
    },
  ];

  return (
    <>
      <div className="fixed z-50 hidden h-fit w-full flex-row justify-between bg-beige px-4 py-2 md:flex md:px-8">
        <Link href={"/"}>
          <Image
            alt="logo"
            src={
              "https://media.discordapp.net/attachments/1092987636035092662/1146799033680138269/Screenshot_2023-08-31_at_11.29.52_pm.png"
            }
            height={500}
            width={500}
            className="h-16 w-fit object-contain invert"
          />
        </Link>
        <div className="hidden h-full flex-row space-x-24 py-2 focus:outline-none md:flex">
          {links.slice(0, -1).map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="group p-2 font-body text-3xl"
            >
              {link.name}
              <span className="block h-0.5 w-0 transform bg-brown transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
        <button className="bg-primary-red hidden h-fit border border-brown p-4 drop-shadow-lg md:block">
          <p className="font-body text-xl">Login</p>
        </button>
      </div>
      <Menu>
        {({ open }: { open: boolean }) => (
          <div
            className={`fixed z-50 flex h-fit w-full flex-col bg-beige px-4 md:hidden ${
              open && "bg-brown text-beige"
            } `}
          >
            <div className="flex flex-row justify-between">
              <Menu.Item key={"home"} href="/" as="a">
                <Image
                  alt="logo"
                  src={
                    "https://media.discordapp.net/attachments/1092987636035092662/1146799033680138269/Screenshot_2023-08-31_at_11.29.52_pm.png"
                  }
                  height={500}
                  width={500}
                  className="h-16 w-fit object-contain invert"
                />
              </Menu.Item>
              <Menu.Button className="block text-2xl focus:outline-none md:hidden">
                <Bars3Icon
                  className={`h-8 w-8 ${open ? "text-beige" : "text-brown"} `}
                />
              </Menu.Button>
            </div>
            <Transition
              enter="transition duration-150 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="flex h-full flex-col space-y-8 py-4 focus:outline-none md:hidden">
                {links.map((link) => (
                  <Menu.Item key={link.href}>
                    <Link
                      href={"/" + link.href}
                      className="p-2 font-body text-3xl font-bold"
                    >
                      {link.name}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu>
    </>
  );
};
export default NavBar;
