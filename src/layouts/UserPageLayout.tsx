import Header from "./Header";
import NavBar from "./NavBar";

interface Props {
  children: React.ReactNode;
  headingText: string;
}

const UserPageLayout: React.FC<Props> = ({ children, headingText }) => {
  return (
    <main className="flex h-full min-h-screen w-full flex-col justify-between bg-beige text-black">
      <div className="">
        <NavBar />
        <div className="flex flex-row justify-center pt-24">
          <div className="md:container">
            <Header headingText={headingText} />
            {children}
          </div>
        </div>
      </div>
      <div>Footer Here</div>
      {/* <Footer /> */}
    </main>
  );
};
export default UserPageLayout;
