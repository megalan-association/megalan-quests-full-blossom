import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useQRCode } from "next-qrcode";

interface Props {
  isOpen: boolean;
  taskId: string;
  userId: string;
  closeModal: () => void;
}

const CompleteTaskModal: React.FC<Props> = ({
  isOpen,
  taskId,
  closeModal,
  userId,
}) => {
  const { Canvas } = useQRCode();

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
              <Dialog.Panel className="h-fit w-full max-w-md transform overflow-hidden rounded-2xl bg-light-pink p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="w-full text-center font-heading text-xl font-medium leading-6 text-pink"
                >
                  Present to Society Admin
                </Dialog.Title>
                <div className="mt-2 flex w-full flex-row justify-center p-2">
                  <Canvas
                    text={userId + "|" + taskId}
                    options={{
                      errorCorrectionLevel: "M",
                      margin: 3,
                      scale: 7.5,
                      color: {
                        dark: "#000000",
                        light: "#ffffff",
                      },
                    }}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-light-green px-4 py-2 font-heading text-sm font-medium text-brown focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default CompleteTaskModal;
