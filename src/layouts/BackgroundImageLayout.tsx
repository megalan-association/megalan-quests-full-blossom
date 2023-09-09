import Image from "next/image";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
  headerText?: string;
  imageURL: string;
}

const BackgroundImageLayout: React.FC<Props> = ({
  imageURL,
  headerText,
  children,
}) => {
  return (
    <main className="relative flex h-full min-h-screen w-full flex-col justify-between bg-beige text-black">
      <div className="relative z-10 w-full">
        <NavBar />
        <div className="relative w-full pt-24">
          {headerText && <Header headingText={headerText} />}
          {children}
        </div>
      </div>

      <Image
        alt="background-image"
        src={imageURL}
        height={1000}
        width={1000}
        className="fixed left-0 top-0 z-0 h-screen w-screen bg-gradient-to-b from-beige to-[#f9c4cf] to-90% object-cover object-center blur-sm"
      />
      <div className="z-10">
        <Footer />
      </div>
    </main>
  );
};

export default BackgroundImageLayout;
