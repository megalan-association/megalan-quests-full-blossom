import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import ProfileCard from "~/components/ProfileCard";
import UserPageLayout from "~/layouts/UserPageLayout";
import { motion } from "framer-motion";
import { springTransition } from "~/utils/animations";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import NotLoggedInPage from "~/components/pages/NotLoggedInPage";
import { useRouter } from "next/router";

const Setup = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const nameOptionsList = ["Keep Current Name", "Choose New Name"];
  const [nameOption, setNameOption] = useState(nameOptionsList[0]);
  const [error, setError] = useState(false);
  const changeNameMutation = api.user.changeName.useMutation();

  if (!(sessionData && sessionData.user)) return <NotLoggedInPage />;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // if they want to keep current name go to dashboard
    if (nameOption === nameOptionsList[0]) {
      router.push("/user/dashboard");
      return;
    }

    const target = e.target as typeof e.target & {
      username: { value: string };
    };

    if (!target.username.value) {
      setError(true);
      return;
    }

    changeNameMutation
      .mutateAsync({
        userId: sessionData.user.id,
        newName: target.username.value,
      })
      .then(() => {
        router.push("/user/dashboard");
      })
      .catch(() => {
        setError(true);
      });
  };

  
  return (
    <UserPageLayout headingText="Setup">
      <section className="h-full w-full space-y-8">
        <ProfileCard />
        <form onSubmit={handleSubmit} className="space-y-4 overflow-clip">
          <RadioGroup
            value={nameOption}
            onChange={setNameOption}
            className="space-y-4"
          >
            <RadioGroup.Label className="font-heading text-xl font-medium text-brown">
              Choose an Option
            </RadioGroup.Label>
            {nameOptionsList.map((option, index) => (
              <RadioGroup.Option key={index} value={option} as={Fragment}>
                {({ checked }) => (
                  <li
                    className={`flex flex-row items-center justify-between rounded-xl p-4 ${
                      checked
                        ? "bg-gradient-to-br from-pink/20 to-pink/40 text-pink"
                        : "bg-light-pink text-brown"
                    }`}
                  >
                    <p className="font-heading text-base">{option}</p>
                    {checked && <CheckIcon className="inline-block h-6 w-6" />}
                  </li>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
          {nameOption === nameOptionsList[1] && (
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="font-heading text-base text-brown"
              >
                New Username
              </label>
              <motion.input
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  ...springTransition,
                  delay: 0,
                }}
                id="username"
                type="text"
                className={`w-full rounded-xl p-4 ${
                  error ? "border-4 border-red-500" : "border-4 border-green"
                } `}
                placeholder="username here"
              />
              {error && (
                <p className="px-4 font-body text-xs font-medium text-red-500">
                  *Encountered Error While Setting Name
                </p>
              )}
            </div>
          )}

          <div className="flex w-full flex-row justify-end">
            <button
              type="submit"
              className="rounded-xl bg-green/20 p-4 px-8 text-green"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </UserPageLayout>
  );
};
export default Setup;
