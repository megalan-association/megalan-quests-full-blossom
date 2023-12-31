import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/24/solid";
import AdminTaskCard from "~/components/AdminTaskCard";
import UserPageLayout from "~/layouts/UserPageLayout";
import { springTransition } from "~/utils/animations";
import CreateTaskModal from "~/components/modals/CreateTaskModal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NotAdminPage from "~/components/pages/NotAdminPage";
import NotLoggedInPage from "~/components/pages/NotLoggedInPage";
import { api } from "~/utils/api";
import LoadingPage from "~/components/pages/LoadingPage";
import { type AdminsTaskData } from "~/utils/types";

const ManageTasks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<AdminsTaskData>();

  const { data: sessionData } = useSession();
  const response = api.admin.getAdminTasks.useQuery();

  useEffect(() => {
    if (!response.isLoading && response.data) {
      setData(response.data);
    }
  }, [response.data, response.isLoading, response.refetch]);

  if (!(sessionData && sessionData.user)) return <NotLoggedInPage />;

  if (sessionData.user.type !== "ADMIN") return <NotAdminPage />;

  if (!data) return <LoadingPage />;

  return (
    <>
      <CreateTaskModal
        societies={data.map((society) => {
          return { id: society.societyId, name: society.societyName };
        })}
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
      />
      <UserPageLayout
        headingText="Manage Tasks"
        backHref="/admin/dashboard"
        backText="Back to Admin Dashboard"
      >
        <section className="h-full w-full space-y-4">
          <button
            onClick={() => setOpenModal(true)}
            className="flex w-full flex-row items-center justify-between rounded-xl bg-gradient-to-br from-green/20 to-green/40 p-4 text-green"
          >
            <p className="font-heading font-medium">Create Task</p>
            <PlusIcon className="h-6 w-6" />
          </button>
          {data.map((society) => (
            <Disclosure key={society.societyId}>
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
                    className="grid h-full w-full grid-cols-1 gap-8 py-4 md:grid-cols-3"
                  >
                    {society.tasks.map((task, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          ...springTransition,
                          delay: index / 10,
                        }}
                      >
                        <AdminTaskCard key={index} data={task} />
                      </motion.div>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </section>
      </UserPageLayout>
    </>
  );
};
export default ManageTasks;
