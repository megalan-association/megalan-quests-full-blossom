import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import TaskCard from "~/components/TaskCard";
import ListInput from "~/components/input/ListInput";
import UserPageLayout from "~/layouts/UserPageLayout";
import { springTransition } from "~/utils/animations";
import { api } from "~/utils/api";
import { TaskDifficultyEnum, type taskCardInfo } from "~/utils/types";



const Room = () => {

  const rawData: taskCardInfo[] = api.tasks.getAllTasks.useQuery().data || []
  const societies: string[] = []

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
     <UserPageLayout headingText="Quests">
      <div className="m-auto w-full font-heading font-bold sm:w-4/5 md:w-[640px]">
        <p className="text-[#F38DB4]">Filter By:</p>
        <div className="grid grid-cols-2 space-x-2">
          <ListInput 
            id="difficulty-filter"
            options={["All difficulties", "Easy", "Medium", "Hard"]}
            selectedOption="All difficulties"
            onSelect={(v) => {
              filterDifficulty = v.toString()
              updateFilter()
            }} 
          />
          <ListInput 
            id="society-filter"
            options={["All societies", ...societies]}
            selectedOption="All societies"
            onSelect={(v) => {
              filterSociety = v.toString()
              updateFilter()
            }}
          />
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
    </UserPageLayout>
    </>
  );
};

export default Room;
