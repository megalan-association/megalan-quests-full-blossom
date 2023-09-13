import { motion } from "framer-motion";
import { useRouter } from "next/router";
import TaskCard from "~/components/TaskCard";
import UserPageLayout from "~/layouts/UserPageLayout";
import { springTransition } from "~/utils/animations";
import { api } from "~/utils/api";

const Room = () => {
  const router = useRouter();
  const room = router.query; // Updated parameter name

  if (!room) {
    return;
  }
  const roomData = api.tasks.getRoomTasks.useQuery({
    roomName: room.slug as string,
  });
  if (!roomData.data) {
    return;
  }

  return (
    <>
      {true ? (
        <UserPageLayout
          headingText="Quests"
          backHref="/user/dashboard"
          backText="Back to Dashboard"
        >
          <div className="m-auto w-full font-heading font-bold sm:w-4/5 md:w-[640px]">
            <p className="text-[#F38DB4]">Filter By:</p>
            <div className="flex space-x-2 pt-2 md:space-x-8">
              <select
                defaultValue="_"
                onChange={(e) => console.log(e.target.value)}
                className="block w-full appearance-none rounded-full border-4 border-[#F38DB4] bg-[#FFE5E5] p-3 text-center text-[#F38DB4]"
              >
                <option value="_" disabled>
                  Task difficulty
                </option>
                <option value="">All difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <select
                defaultValue="_"
                onChange={(e) => console.log(e)}
                className="block w-full appearance-none rounded-full border-4 border-[#F38DB4] bg-[#FFE5E5] p-3 text-center text-[#F38DB4]"
              >
                <option value="_" disabled>
                  Society
                </option>
                <option value="">All societies</option>
                <option value="Cockatoo society">Cockatoo society</option>
                <option value="Not a society">Not a society</option>
              </select>
            </div>
          </div>
          <div className="grid h-full w-full grid-cols-1 gap-8 py-8 md:grid-cols-3">
            {roomData.data.map((task, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  ...springTransition,
                  delay: index / 10,
                }}
              >
                <TaskCard key={index} data={task} />
              </motion.div>
            ))}
          </div>
        </UserPageLayout>
      ) : (
        <>hello</>
      )}
    </>
  );
};

export default Room;
