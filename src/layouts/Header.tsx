import Image from "next/image";

interface Props {
  headingText: string;
}

const Header: React.FC<Props> = ({ headingText }) => {
  return (
    <div className="flex w-full flex-row items-center">
      <div className="flex-1 text-right">
        <Image
          className="h-12 w-full object-cover"
          src="/h1-petals.png"
          alt="flowers"
          width={250}
          height={150}
        />
      </div>
      <h1 className="bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text text-center font-heading text-4xl font-bold text-transparent drop-shadow-[0px_4px_20px_#FFA2B4]">
        {headingText}
      </h1>
      <div className="flex-1">
        <Image
          className="h-12 w-full object-cover"
          src="/h1-petals.png"
          alt="flowers"
          width={250}
          height={150}
        />
      </div>
    </div>
  );
};
export default Header;
