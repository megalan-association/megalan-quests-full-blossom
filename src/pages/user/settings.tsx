import { PencilIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ProfileCard from "~/components/ProfileCard";
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
      <section className="h-full w-full space-y-16 py-8">
        <ProfileCard />
        <div className="flex w-full flex-col items-center justify-center space-y-8">
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
