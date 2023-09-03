import NavBar from "./NavBar";
// import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (<>
    <div className="absolute top-o left-0 w-full h-full -z-50 bg-beige"></div>
    <main className="flex h-full w-full flex-col justify-between text-black">
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
