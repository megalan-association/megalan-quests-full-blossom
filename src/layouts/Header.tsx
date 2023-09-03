import Image from "next/image";

interface Props {
  headingText: string;
}

const Header: React.FC<Props> = ({ headingText }) => {
  return (
    <div className="flex w-full flex-row items-center justify-center">
      <Image
        src="/h1-petals.png"
        alt="Header banner"
        width={250}
        height={200}
        className="h-12 object-contain"
      />
      <h1 className="bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text font-heading text-4xl font-bold text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] xs:px-2 sm:px-4 sm:text-5xl">
        {headingText}
      </h1>
      <Image
        src="/h1-petals.png"
        width={250}
        height={200}
        alt="Header banner"
        className="h-12 object-contain"
      />
    </div>
  );
};
export default Header;
