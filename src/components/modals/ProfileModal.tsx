import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  user: {
    id: string;
    name: string;
    points: number;
    rank: number;
    image: string | null;
  };
}

const ProfileModal: React.FC<Props> = ({ isOpen, closeModal, user }) => {
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
                  className="w-full text-center font-heading text-3xl font-medium leading-6 text-pink"
                >
                  Profile
                </Dialog.Title>
                <div className="mt-6 flex flex-row items-center justify-center gap-4">
                  <div className="h-20 w-20 flex-shrink-0 rounded-full bg-gradient-to-br from-pink/40 to-pink/80 p-1 drop-shadow-lg">
                    {user.image ? (
                      <Image
                        alt="society logo"
                        src={user.image}
                        width={150}
                        height={150}
                        className="h-full w-full flex-shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-500" />
                    )}
                  </div>
                  <div className="">
                    <h2 className="font-heading text-xl font-medium text-brown md:text-3xl">
                      {user.name}
                    </h2>
                    <div className="flex flex-row space-x-4">
                      <p className="font-body text-base font-medium text-brown">
                        #{user.rank}
                      </p>
                      <p className="font-body text-base font-medium text-brown">
                        {user.points}xp
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-body  mt-6 w-full rounded-xl bg-white p-2 text-brown"
                >
                  Close
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default ProfileModal;
