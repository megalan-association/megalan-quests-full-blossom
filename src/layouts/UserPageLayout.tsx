import BackButton from "~/components/BackButton";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
  headingText: string;
  backHref?: string;
  backText?: string;
}

const UserPageLayout: React.FC<Props> = ({
  children,
  headingText,
  backHref,
  backText,
}) => {
  return (
    <main className="flex h-full min-h-screen w-full flex-col justify-between bg-beige text-black">
      <div className="">
        <NavBar />
        <div className="flex flex-row justify-center pt-24">
          <div className="md:container">
            {backHref && backText && (
              <BackButton href={backHref} text={backText} />
            )}
            <Header headingText={headingText} />
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
export default UserPageLayout;
