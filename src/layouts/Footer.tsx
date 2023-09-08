import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <div className="h-fit w-full p-4">
      <p className="font-body text-base font-semibold tracking-wider text-brown md:text-xl">
        {router.pathname.replaceAll("/", " / ")}
      </p>
    </div>
  );
};
export default Footer;
