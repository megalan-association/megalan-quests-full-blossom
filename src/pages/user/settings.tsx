import { PencilIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import NotLoggedIn from "~/components/pages/NotLoggedIn";
import UserPageLayout from "~/layouts/UserPageLayout";

const Settings = () => {
  const { data: session } = useSession();
  if (!session?.user) return <NotLoggedIn />;
  return (
    <UserPageLayout
      headingText="Settings"
      backHref="/user/dashboard"
      backText="Back to User Dashboard"
    >
      <section className="h-full w-full space-y-8 py-8">
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="h-20 w-20 flex-shrink-0 rounded-full bg-gradient-to-br from-pink/40 to-pink/80 p-1 drop-shadow-lg">
            {session.user.image ? (
              <Image
                alt="society logo"
                src={session.user.image}
                width={150}
                height={150}
                className="h-full w-full flex-shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-500" />
            )}
          </div>
          <div className="overflow-y-auto">
            <h2 className="font-heading text-xl font-medium text-brown md:text-3xl">
              {session.user.name}
            </h2>
            <p className="font-body text-base font-medium text-brown">
              {session.user.type}
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center space-y-4">
          <button className="font-xl flex w-fit items-center rounded-xl bg-gradient-to-br from-green/20 to-green/40 px-4 py-2 font-heading text-brown">
            Change Name
            <span className="inline-block pl-4">
              <PencilIcon className="h-6 w-6 text-brown" />
            </span>
          </button>
          <button className="font-xl flex w-fit items-center rounded-xl bg-gradient-to-br from-green/20 to-green/40 px-4 py-2 font-heading text-brown">
            Become Admin
            <span className="inline-block pl-2">
              <UsersIcon className="h-6 w-6 text-brown" />
            </span>
          </button>
        </div>
      </section>
    </UserPageLayout>
  );
};

export default Settings;
