import { usePathname } from "next/navigation";

const Footer = () => {
  let path = usePathname();
  path = decodeURIComponent(path);
  return (
    <div className="h-fit w-full p-4">
      <p className="font-body text-base font-semibold tracking-wider text-brown md:text-xl">
        {path.replaceAll("/", " / ")}
      </p>
    </div>
  );
};
export default Footer;
