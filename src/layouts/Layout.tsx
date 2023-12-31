import NavBar from "./NavBar";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <main className="flex h-full min-h-screen w-full flex-col justify-between bg-beige text-black">
        <div className="">
          <NavBar />
          <div className="pt-24">{children}</div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
