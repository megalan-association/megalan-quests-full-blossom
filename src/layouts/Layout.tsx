import NavBar from "./NavBar";
// import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (<>
    <div className="absolute h-full w-full -z-50 left-0 top-o bg-beige"></div>
    <main className="flex h-full w-full flex-col justify-between bg-beige text-black">
      <div className="">
        <NavBar />
        <div className="pt-24">{children}</div>
      </div>
      <div>Footer Here</div>
      {/* <Footer /> */}
    </main>
    </>);
};

export default Layout;
