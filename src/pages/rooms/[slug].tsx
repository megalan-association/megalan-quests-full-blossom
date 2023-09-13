import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import TaskCard from "~/components/TaskCard";
import UserPageLayout from "~/layouts/UserPageLayout";
import { springTransition } from "~/utils/animations";
import { api } from "~/utils/api";
import { TaskDifficultyEnum, type taskCardInfo } from "~/utils/types";



const Room = () => {
  const router = useRouter();
  const room  = router.query; // Updated parameter name
  let rawData: taskCardInfo[] = []
  const societies: string[] = []

  if (room) {
    const roomData = api.tasks.getRoomTasks.useQuery({ roomName: room.slug as string });
    rawData = roomData.data || []
  }

  for (const t of rawData) {
    if (!societies.includes(t.societyName)) {
      societies.push(t.societyName)
    }
  }

  const [filteredData, updateFilteredData] = useState(rawData)
  let filterDifficulty = ""
  let filterSociety = ""
  const updateFilter = () => {
    const intermediate: taskCardInfo[] = []
    const result: taskCardInfo[] = []
    for (const t of rawData) {
      if (filterSociety == "" || filterSociety == "_") {
        intermediate.push(t)
      } else if (t.societyName == filterSociety) {
        intermediate.push(t)
      }
    }
    for (const t of intermediate) {
      if (filterDifficulty == "" || filterDifficulty == "_") {
        result.push(t)
      } else if (filterDifficulty == "Easy" && t.taskDifficulty == TaskDifficultyEnum.Easy) {
        result.push(t)
      } else if (filterDifficulty == "Medium" && t.taskDifficulty == TaskDifficultyEnum.Medium ) {
        result.push(t)
      } else if (filterDifficulty == "Hard" && t.taskDifficulty == TaskDifficultyEnum.Hard) {
        result.push(t)
      }
    }
    updateFilteredData(result)
  }

  return (
    <>
    { true ?
     <UserPageLayout headingText="Quests">
      <div className="m-auto w-full font-heading font-bold sm:w-4/5 md:w-[640px]">
        <p className="text-[#F38DB4]">Filter By:</p>
        <div className="flex space-x-2 pt-2 md:space-x-8">
          <select
            defaultValue="_"
            onChange={(e) => {
              filterDifficulty = e.target.value
              updateFilter()
            }}
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
            onChange={(e) => {
              filterSociety = e.target.value
              updateFilter()
            }}
            className="block w-full appearance-none rounded-full border-4 border-[#F38DB4] bg-[#FFE5E5] p-3 text-center text-[#F38DB4]"
          >
            <option value="_" disabled>
              Society
            </option>
            <option value="">All societies</option>
            {societies.map((s, i) => {
              return (<option key={i} value={s}>{s}</option>)
            })}
          </select>
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-1 gap-8 py-8 md:grid-cols-3">
        {filteredData.map((task, index) => (
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
    </UserPageLayout> : <>hello</>}
    </>
  );
};

export default Room;
