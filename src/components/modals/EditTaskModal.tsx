import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, type SyntheticEvent } from "react";
import { TaskDifficultyOptions, TaskPointsOptions } from "~/utils/constants";
import { type TaskDifficultyEnum, type taskCardInfo } from "~/utils/types";
import ListInput from "../input/ListInput";
import { PencilIcon } from "@heroicons/react/24/solid";
import { ConvertDifficultyToString } from "~/utils/helpers";

interface Props {
  isOpen: boolean;
  data: taskCardInfo;
  closeModal: () => void;
}

const EditTaskModal: React.FC<Props> = ({ isOpen, data, closeModal }) => {
  const [taskData, setTaskData] = useState<taskCardInfo>(data);

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submitted");
  };

  const updateForm = (field: string, value: string | number) => {
    const tempData = taskData;
    if (field === "title") {
      tempData.taskName = value as string;
    }
    if (field === "points") {
      tempData.taskPoints = value as number;
    }
    if (field === "description") {
      tempData.taskDescription = value as string;
      console.log(tempData.taskDescription);
    }
    if (field === "difficulty") {
      if (!TaskDifficultyOptions.includes(value as string)) return;
      tempData.taskDifficulty = value as TaskDifficultyEnum;
    }
    setTaskData(tempData);
    console.log(tempData);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-beige p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="flex flex-row items-center justify-between text-pink"
                >
                  <h1 className="font-heading text-xl font-semibold ">
                    Editing {data.taskName}
                  </h1>
                  <PencilIcon className="h-6 w-6 flex-shrink-0" />
                </Dialog.Title>
                <div className="mt-2">
                  <form className="space-y-2" onSubmit={submitForm}>
                    <div>
                      <label
                        htmlFor="title"
                        className="font-heading text-base font-medium text-brown"
                      >
                        Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={taskData.taskName}
                        placeholder="Title Here"
                        className="h-10 w-full rounded-xl px-4 py-2 text-brown drop-shadow-md"
                        onSubmit={(e) =>
                          updateForm("title", e.currentTarget.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="points"
                        className="font-heading text-base font-medium text-brown"
                      >
                        Points
                      </label>
                      <ListInput
                        id="points"
                        onSelect={(value) => updateForm("points", value)}
                        options={TaskPointsOptions}
                        selectedOption={taskData.taskPoints}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="font-heading text-base font-medium text-brown"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        placeholder="description here"
                        className="h-40 w-full rounded-t-xl rounded-bl-xl px-4 py-2 text-brown drop-shadow-md"
                        defaultValue={taskData.taskDescription}
                        onChange={(value) =>
                          updateForm("description", value.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="difficulty"
                        className="font-heading text-base font-medium text-brown"
                      >
                        Difficulty
                      </label>
                      <ListInput
                        id="points"
                        onSelect={(value) => updateForm("difficulty", value)}
                        options={TaskDifficultyOptions}
                        selectedOption={ConvertDifficultyToString(
                          data.taskDifficulty
                        )}
                      />
                    </div>
                    <div className="flex flex-row justify-end space-x-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border-2 border-red-500/20 bg-red-200/40 px-4 py-2 text-base font-medium text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:text-xl"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border-2 border-green/20 bg-light-green/40 px-4 py-2 text-base font-medium text-green focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:text-xl"
                        onClick={closeModal}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default EditTaskModal;
