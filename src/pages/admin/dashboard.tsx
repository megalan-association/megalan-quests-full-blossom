import Link from "next/link";
import Image from "next/image";
import BackgroundImageLayout from "~/layouts/BackgroundImageLayout";
import { useSession } from "next-auth/react";
import NotAdminPage from "~/components/pages/NotAdminPage";
import NotLoggedInPage from "~/components/pages/NotLoggedInPage";

const Dashboard = () => {
  const { data: sessionData } = useSession();

  if (!(sessionData && sessionData.user)) return <NotLoggedInPage />;

  if (sessionData.user.type !== "ADMIN") return <NotAdminPage />;
  return (
    <BackgroundImageLayout
      headerText="Admin Dashboard"
      imageURL="/two-cherry-branch-bg.png"
    >
      <section className="flex h-full min-h-[65dvh] w-full flex-col items-center justify-center gap-12 px-4 py-16">
        <Link
          href="/admin/completeTask"
          className="relative block h-fit w-fit rounded-2xl bg-gradient-to-b from-[#FDB5C4] to-[#C58895] p-1"
        >
          <div className="absolute flex h-full w-full translate-y-4 flex-col items-end justify-end">
            <Image
              alt="flower"
              src="/cherry-1.png"
              width={150}
              height={150}
              className="h-12 w-12 object-contain"
            />
          </div>
          <div className="h-fit w-fit rounded-xl bg-light-pink px-8 py-4">
            <p className="text-heading text-center text-xl font-bold text-pink md:text-3xl">
              Complete Task
            </p>
          </div>
        </Link>
        <Link
          href="/admin/manageTasks"
          className="relative block h-fit w-fit rounded-2xl bg-gradient-to-b from-[#FDB5C4] to-[#C58895] p-1"
        >
          <div className="absolute flex h-full w-full translate-y-6 flex-col items-start justify-end">
            <Image
              alt="flower"
              src="/cherry-2.png"
              width={150}
              height={150}
              className="h-16 w-16 object-contain"
            />
          </div>
          <div className="h-fit w-fit rounded-xl bg-light-pink px-8 py-4">
            <p className="text-heading text-center text-xl font-bold text-pink md:text-3xl">
              Manage Tasks
            </p>
          </div>
        </Link>
        <Link
          href="/admin/manageAdmins"
          className="relative block h-fit w-fit rounded-2xl bg-gradient-to-b from-[#FDB5C4] to-[#C58895] p-1"
        >
          <div className="absolute flex h-full w-full -translate-y-6 flex-col items-end justify-start">
            <Image
              alt="flower"
              src="/cherry-3.png"
              width={150}
              height={150}
              className="h-12 w-12 object-contain"
            />
          </div>
          <div className="h-fit w-fit rounded-xl bg-light-pink px-8 py-4">
            <p className="text-heading text-center text-xl font-bold text-pink md:text-3xl">
              Manage Admins
            </p>
          </div>
        </Link>
      </section>
    </BackgroundImageLayout>
  );
};
export default Dashboard;
