import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import AdminTaskCard from "~/components/AdminTaskCard";
import UserPageLayout from "~/layouts/UserPageLayout";
import { type taskCardInfo } from "~/utils/types";

const ManageTasks = () => {
  const placeholderTaskData: taskCardInfo[] = [
    {
      societyImage: "",
      taskName: "Lorem Ipsum Task 1",
      societyName: "Lorem Ipsum Society 1",
      taskDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus tincidunt mauris, id interdum ligula tincidunt a. Integer feugiat suscipit justo, vel congue lorem feugiat id. Sed vulputate eros et libero vulputate.",
      taskDifficulty: "Medium",
      taskPoints: 50,
    },
    {
      societyImage: "",
      taskName: "Lorem Ipsum Task 2",
      societyName: "Lorem Ipsum Society 2",
      taskDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus tincidunt mauris, id interdum ligula tincidunt a. Integer feugiat suscipit justo, vel congue lorem feugiat id. Sed vulputate eros et libero vulputate.",
      taskDifficulty: "Easy",
      taskPoints: 20,
    },
    {
      societyImage: "",
      taskName: "Lorem Ipsum Task 3",
      societyName: "Lorem Ipsum Society 3",
      taskDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus tincidunt mauris, id interdum ligula tincidunt a. Integer feugiat suscipit justo, vel congue lorem feugiat id. Sed vulputate eros et libero vulputate.",
      taskDifficulty: "Hard",
      taskPoints: 80,
    },
  ];
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
              <Disclosure.Button className="flex h-full w-full flex-row justify-between rounded-2xl bg-light-pink p-4">
                <h1 className="font-heading text-2xl font-semibold text-pink md:text-5xl">
                  RGS Tasks
                </h1>
                <ChevronRightIcon
                  className={`h-6 w-6 text-pink ${
                    open ? "rotate-90 transform" : ""
                  }`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel>
                  <div className="grid h-full w-full grid-cols-1 gap-8 py-4 md:grid-cols-3">
                    {placeholderTaskData.map((task, index) => (
                      <AdminTaskCard key={index} data={task} />
                    ))}
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </section>
    </UserPageLayout>
  );
};
export default ManageTasks;
