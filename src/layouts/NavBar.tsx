import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
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
  ];

  return (
    <>
      <div className="fixed z-50 hidden lg:grid h-fit w-full grid-cols-[auto_1fr_auto] justify-between bg-beige px-4 py-2 lg:px-8">
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
        <div className="hidden lg:grid h-full w-full text-center grid-cols-3 focus:outline-none">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="group px-3 h-full font-body text-2xl"
            >
              <div className="py-4 text-center">{link.name}</div>
              <span className="block h-0.5 w-0 transform bg-brown transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
        <button className="bg-primary-red hidden h-fit border border-brown p-4 drop-shadow-lg lg:block">
          <p className="font-body text-xl">Login / Sign Up</p>
        </button>
      </div>
      <Menu>
        {({ open }: { open: boolean }) => (
          <div
            className={`fixed z-50 flex h-fit w-full flex-col bg-beige px-4 lg:hidden ${
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
              <Menu.Button className="block text-2xl focus:outline-none lg:hidden">
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
              <Menu.Items className="flex h-full flex-col space-y-8 py-4 focus:outline-none lg:hidden">
                {links.map((link) => (
                  <Menu.Item
                    as="a"
                    href={link.href}
                    key={link.href}
                    className="p-2 font-body text-3xl font-bold"
                  >
                    {link.name}
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
