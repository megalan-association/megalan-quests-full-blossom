import { PencilIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ProfileCard from "~/components/ProfileCard";
import NotLoggedIn from "~/components/pages/NotLoggedIn";
import UserPageLayout from "~/layouts/UserPageLayout";

const Settings = () => {
  const { data: session } = useSession();
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(false);

  if (!session?.user) return <NotLoggedIn />;
  const handleNameChangeSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setEditName(false);
    // api call here
  };
  return (
    <UserPageLayout
      headingText="Settings"
      backHref="/user/dashboard"
      backText="Back to User Dashboard"
    >
      <section className="h-full w-full space-y-16 py-8">
        <ProfileCard />
        <div className="flex w-full flex-col items-center justify-center space-y-8">
          <div className="flex flex-col items-center">
            <button
              onClick={() => setEditName(!editName)}
              className="flex w-full items-center justify-between space-x-4 rounded-xl bg-gradient-to-br from-green/20 to-green/40 px-4 py-2 "
            >
              <p className="font-xl font-heading text-brown">Change Name</p>
              <PencilIcon className="h-6 w-6 text-brown" />
            </button>
            {editName && (
              <form
                onSubmit={handleNameChangeSubmit}
                className="space-y-4 overflow-clip pt-2"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="font-heading text-base text-brown"
                  >
                    New Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    className={`w-full rounded-xl p-4 ${
                      error
                        ? "border-4 border-red-500"
                        : "border-4 border-green"
                    } `}
                    placeholder="username here"
                    onChange={(e) => setNewName(e.currentTarget.value)}
                  />
                  {error && (
                    <p className="px-4 font-body text-xs font-medium text-red-500">
                      *{newName} is already taken
                    </p>
                  )}
                </div>

                <div className="flex w-full flex-row justify-end space-x-2">
                  <button
                    onClick={() => setEditName(false)}
                    className="rounded-xl bg-red-500/20 px-8 py-2 text-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-green/20 px-8 py-2 text-green"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
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
