import { Disclosure } from "@headlessui/react";
import { type Transition, motion } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import AdminTaskCard from "~/components/AdminTaskCard";
import UserPageLayout from "~/layouts/UserPageLayout";
import { placeholderTaskData } from "~/utils/dummydata";

const ManageTasks = () => {
  const springTransition: Transition = {
    type: "spring",
    duration: 1,
    ease: [0.4, 0.0, 0.2, 1], // You can adjust the easing values here
  };

  return (
    <UserPageLayout
      headingText="Manage Tasks"
      backHref="/admin/dashboard"
      backText="Back to Admin Dashboard"
    >
      <section className="h-full w-full">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex h-full w-full flex-row items-center justify-between rounded-2xl bg-gradient-to-br from-light-pink to-[#f9c4cf] p-4">
                <h1 className="font-heading text-xl font-semibold text-pink md:text-3xl">
                  RGS Tasks
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
                {placeholderTaskData.map((task, index) => (
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
      </section>
    </UserPageLayout>
  );
};
export default ManageTasks;
