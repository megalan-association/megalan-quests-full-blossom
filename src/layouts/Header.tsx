import Image from "next/image";

interface Props {
  headingText: string;
}

const Header: React.FC<Props> = ({ headingText }) => {
  return (
    <div className="flex h-full flex-row items-center justify-center">
      <div className="flex h-full w-fit flex-row items-center">
        <div className="flex-1 bg-fixed">
          <Image
            className="h-12 w-fit object-contain"
            src="/h1-petals.png"
            alt="flowers"
            width={250}
            height={150}
          />
        </div>
        <h1 className="w-fit bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text text-center font-heading text-3xl font-bold text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] md:text-6xl">
          {headingText}
        </h1>
        <div className="flex-1 bg-fixed">
          <Image
            className="h-12 w-full object-contain"
            src="/h1-petals.png"
            alt="flowers"
            width={250}
            height={150}
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
