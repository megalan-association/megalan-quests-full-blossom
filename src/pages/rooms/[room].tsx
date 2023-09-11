import { motion } from "framer-motion";
import { type GetStaticProps, type GetStaticPaths } from "next";
import { useRouter } from "next/router";
import TaskCard from "~/components/TaskCard";
import UserPageLayout from "~/layouts/UserPageLayout";
import { springTransition } from "~/utils/animations";
import { api } from "~/utils/api";
import { roomsList } from "~/utils/constants";
import type { taskCardInfo } from "~/utils/types";

interface Task {
  id: string;
  name: string;
}

interface RoomPageProps {
  tasks: Task[];
}

const Room = () => {
  const router = useRouter();
  const { room } = router.query; // Updated parameter name

  // const getAllTasksRoute = api.tasks.getAllTasks.useQuery()
  // const getRoomTasksRoute = api.tasks.getRoomTasks.useQuery({roomId: room || "All Tasks"})

  const allTasksData = api.tasks.getAllTasks.useQuery().data || []
  // const roomTasksData = api.tasks.getRoomTasks.useQuery({roomId: typeof(room) == "string" ? room : "none"}).data || []

  const displayData: taskCardInfo[] = []
  for (const t of allTasksData) {
    displayData.push({
      id: t.id,
      taskName: t.name,
      taskDescription: "API does not provide a description",
      taskPoints: t.points,
      taskDifficulty: 0, // API does not provide a task difficulty
      societyName: t.society?.name || "Society not found",
      societyImage: "null" 
    })
  }
  // if (room == "All Tasks") {
  //   for (const t of allTasksData) {
  //     displayData.push({
  //       id: t.id,
  //       taskName: t.name,
  //       taskDescription: "API does not provide a description",
  //       taskPoints: t.points,
  //       taskDifficulty: 0, // API does not provide a task difficulty
  //       societyName: t.society?.name || "Society not found",
  //       societyImage: "null" 
  //     })
  //   }
  // } else {
  //   for (const t of roomTasksData) {
  //     displayData.
  //   }
  // }

  console.log(room);

  return (
    <UserPageLayout headingText="Quests">
      <div className="m-auto w-full font-heading font-bold sm:w-4/5 md:w-[640px]">
        <p className="text-[#F38DB4]">Filter By:</p>
        <div className="flex space-x-2 pt-2 md:space-x-8">
          <select
            defaultValue="_"
            onChange={(e) => console.log(e)}
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
        {displayData.map((task, index) => (
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
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  // Return a list of possible values for room
  const paths = roomsList.map((room) => ({
    params: { room: room }, // Updated parameter name
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<RoomPageProps> = ({}) => {
  // Fetch necessary data for the blog post using params.room

  return {
    props: {
      tasks: [
        {
          id: "1",
          name: "dummy task 1",
        },
        {
          id: "2",
          name: "dummy task 2",
        },
      ],
    },
  };
};

export default Room;
