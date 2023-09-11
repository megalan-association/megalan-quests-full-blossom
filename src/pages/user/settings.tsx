import { PencilIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ProfileCard from "~/components/ProfileCard";
import NotLoggedIn from "~/components/pages/NotLoggedIn";
import UserPageLayout from "~/layouts/UserPageLayout";
import { api } from "~/utils/api";


const Settings = () => {
  const { data: session } = useSession();
  const [adminToken, setAdminToken] = useState("");
  const [newName, setNewName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const [tokenSuccess, setTokenSuccess] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);

  if (!session?.user) return <NotLoggedIn />;

  const updateNameMutation = api.user.changeName.useMutation()
  const changeName = async (newName: string) => {
    const result = await updateNameMutation.mutateAsync( {userId: session.user.id, newName: newName} )
    console.log(result);
  }

  const handleNameChangeSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // api call here
    setNewName("");
    setNameSuccess(true);
    setTimeout(() => {
      setNameSuccess(false);
    }, 2500);
  };

  const handleAdminTokenSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // api call here
    setAdminToken("");
    setTokenSuccess(true);
    setTimeout(() => {
      setTokenSuccess(false);
    }, 2500);
  };

  return (
    <UserPageLayout
      headingText="Settings"
      backHref="/user/dashboard"
      backText="Back to User Dashboard"
    >
      <section className="h-full w-full space-y-8 py-8">
        <ProfileCard />
        <div className="flex w-full flex-col items-center justify-center space-y-4">
          <div className="flex w-full flex-col items-center">
            <div className="flex w-full items-center justify-between space-x-4 px-2">
              <p className="font-heading text-xl font-medium text-brown">
                Change Name
              </p>
              <PencilIcon className="h-6 w-6 text-brown" />
            </div>

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
                  value={newName}
                  className={`w-full rounded-xl p-4 ${
                    nameError
                      ? "border-4 border-red-500"
                      : "border-4 border-green"
                  } `}
                  placeholder="username"
                  onChange={(e) => setNewName(e.currentTarget.value)}
                />
                {nameError && (
                  <p className="px-4 font-body text-xs font-medium text-red-500">
                    *{newName} is already taken
                  </p>
                )}
                {nameSuccess && (
                  <p className="px-4 font-body text-xs font-medium text-green">
                    Your New Username is Valid !
                  </p>
                )}
              </div>
              {newName.length > 0 && (
                <div className="flex w-full flex-row justify-end space-x-2">
                  <button className="rounded-xl bg-red-500/20 px-8 py-2 text-red-500">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-green/20 px-8 py-2 text-green"
                    onClick={() => {
                      changeName(newName).catch((error) => {console.log(error)}); 
                    }}
                  >
                    Save
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="flex w-full flex-col items-center px-2">
            <div className="flex w-full items-center justify-between space-x-4">
              <p className="font-heading text-xl font-medium text-brown">
                Become an Admin
              </p>
              <UsersIcon className="h-6 w-6 text-brown" />
            </div>
            <form
              id="admin-token-form"
              onSubmit={handleAdminTokenSubmit}
              className="space-y-4 "
            >
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="font-heading text-base text-brown"
                >
                  Add Society Token
                </label>
                <input
                  id="admin-token"
                  type="text"
                  value={adminToken}
                  className={`w-full rounded-xl p-4 ${
                    tokenError
                      ? "border-4 border-red-500"
                      : "border-4 border-green"
                  } `}
                  placeholder="Society Token"
                  onChange={(e) => setAdminToken(e.currentTarget.value)}
                />
                {tokenError && (
                  <p className="px-4 font-body text-xs font-medium text-red-500">
                    *The token you entered is invalid
                  </p>
                )}
                {tokenSuccess && (
                  <p className="px-4 font-body text-xs font-medium text-green">
                    Your Token is Valid !
                  </p>
                )}
              </div>
              {adminToken.length > 0 && (
                <div className="flex w-full flex-row justify-end space-x-2">
                  <button className="rounded-xl bg-red-500/20 px-8 py-2 text-red-500">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-green/20 px-8 py-2 text-green"
                  >
                    Add
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </UserPageLayout>
  );
};

export default Settings;
