import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, TrashIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingPage from "~/components/pages/LoadingPage";
import NotAdminPage from "~/components/pages/NotAdminPage";
import NotLoggedInPage from "~/components/pages/NotLoggedInPage";
import UserPageLayout from "~/layouts/UserPageLayout";
import { springTransition } from "~/utils/animations";
import { api } from "~/utils/api";
import { type SocietyAdminData } from "~/utils/types";

const ManageAdmins = () => {
  const { data: sessionData } = useSession();
  const [adminData, setAdminData] = useState<SocietyAdminData[]>([]);
  const admin = api.admin.getAllAdmins.useQuery();
  const removeAdminMutation = api.admin.removeAdmin.useMutation();

  const handleAdminRemove = (adminId: string, societyId: string) => {
    removeAdminMutation
      .mutateAsync({
        adminId,
        societyId,
      })
      .then(() => {
        admin.refetch();
      });
  };

  useEffect(() => {
    if (admin.data && admin.data.length > 0) {
      setAdminData(admin.data);
    }
  }, [admin.data, admin.refetch]);

  if (!(sessionData && sessionData.user)) return <NotLoggedInPage />;

  if (sessionData.user.type !== "ADMIN") return <NotAdminPage />;

  if (!admin.data) return <LoadingPage />;

  return (
    <UserPageLayout
      headingText="Manage Admins"
      backHref="/admin/dashboard"
      backText="Back to Admin Dashboard"
    >
      <section className="h-full w-full space-y-4">
        {adminData.map((society, index) => (
          <Disclosure as="div" key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex h-full w-full flex-row items-center justify-between rounded-2xl bg-gradient-to-br from-light-pink to-[#f9c4cf] p-4">
                  <h1 className="font-heading text-xl font-semibold text-pink md:text-3xl">
                    {society.societyName}
                  </h1>
                  <ChevronUpIcon
                    className={`h-6 w-6 transform text-pink duration-150 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  as="div"
                  className="grid h-full w-full grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3"
                >
                  {society.admins.map((admin, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 25, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        ...springTransition,
                        delay: index / 10,
                      }}
                    >
                      <div
                        key={admin.id}
                        className="flex flex-row items-center justify-between rounded-xl bg-light-pink p-1 text-pink"
                      >
                        <p className="p-4 font-heading font-medium">
                          {admin.name}
                        </p>
                        {admin.id !== sessionData.user.id && (
                          <button
                            onClick={() =>
                              handleAdminRemove(admin.id, society.societyId)
                            }
                            className="p-4"
                          >
                            <TrashIcon className="h-6 w-6" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </section>
    </UserPageLayout>
  );
};

export default ManageAdmins;
