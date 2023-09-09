import Image from "next/image";
import { type taskCardInfo } from "~/utils/types";
import SeeMore from "./SeeMore";
import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import EditTaskModal from "./modals/EditTaskModal";
import { ConvertDifficultyToString } from "~/utils/helpers";

interface Props {
  data: taskCardInfo;
}

const AdminTaskCard: React.FC<Props> = ({ data }) => {
  const [enabled, setEnabled] = useState(false);
  const [editing, setEditing] = useState(false);
  return (
    <>
      <EditTaskModal
        data={data}
        isOpen={editing}
        closeModal={() => setEditing(false)}
      />
      <div
        className={`block h-fit w-full rounded-2xl bg-gradient-to-b from-yellow-900 to-[#CCC786] p-2 transition duration-300 ${
          !enabled && "grayscale"
        }`}
      >
        <div className="flex h-full w-full flex-col gap-2">
          <div className="relative rounded-t-xl bg-white">
            <div className="pointer-events-none absolute -right-4 -top-10 flex h-full w-full flex-row items-end justify-end">
              <Image
                alt="flower"
                src="/cherry-4.png"
                width={150}
                height={150}
                className="h-fit w-14 object-contain"
              />
            </div>
            <div className="flex w-full flex-row items-center justify-start space-x-4 px-4 py-2">
              {data.societyImage ? (
                <Image
                  alt="society logo"
                  src={data.societyImage}
                  width={150}
                  height={150}
                  className="h-12 w-12 flex-shrink-0 rounded-3xl object-cover"
                />
              ) : (
                <div className="h-12 w-12 flex-shrink-0 rounded-3xl bg-gray-500" />
              )}
              <div>
                <h1 className="font-heading text-xl font-medium text-brown md:text-3xl">
                  {data.taskName.repeat(2)}
                </h1>
                <h2 className="font-heading text-xs font-medium text-pink md:text-base">
                  {data.societyName}
                </h2>
              </div>
            </div>
          </div>
          <div className="relative h-full space-y-2 bg-[#FDB3C2]">
            <div className="h-full w-full px-4 py-2">
              <p className="font-heading text-base font-medium text-white md:text-xl">
                {data.taskPoints} Points upon completion !
              </p>
              <p className="font-body text-xs font-medium text-white md:text-base">
                <SeeMore text={data.taskDescription} />
              </p>
              <p className="w-full pt-2 text-right font-heading text-base font-medium text-pink md:text-xl">
                Task Difficulty:{" "}
                {ConvertDifficultyToString(data.taskDifficulty)}
              </p>
            </div>
          </div>
          <div className="relative rounded-b-xl bg-white">
            <div className="pointer-events-none absolute -bottom-6 -left-6 flex h-full w-full flex-row items-end justify-start">
              <Image
                alt="flower"
                src="/cherry-2.png"
                width={150}
                height={150}
                className="h-fit w-20 object-contain"
              />
            </div>
            <div className="flex h-full w-full flex-row items-center justify-end gap-2 px-4 py-2">
              <button
                onClick={() => setEditing(true)}
                className="flex items-center rounded-xl border-2 border-brown/20 bg-light-green/40 px-4 py-2 font-heading text-xs font-medium text-brown md:text-base"
              >
                Edit Task
                <span className="inline-block pl-2">
                  <PencilIcon className="h-5 w-5" />
                </span>
              </button>
              <button
                onClick={() => setEnabled(!enabled)}
                className="flex items-center rounded-xl border-2 border-green/20 bg-light-green/40 px-4 py-2 font-heading text-xs font-medium text-green md:text-base"
              >
                {enabled ? "Deactivate Task" : "Activate Task"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTaskCard;
