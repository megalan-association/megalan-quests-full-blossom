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
      <div className="w-full">
        <NavBar />
        <div className="flex w-full flex-row items-start justify-center px-4 pt-24">
          <div className="w-full space-y-4 md:container">
            {backHref && backText && (
              <BackButton href={backHref} text={backText} />
            )}
            <Header headingText={headingText} />
            <div className="">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
export default UserPageLayout;
