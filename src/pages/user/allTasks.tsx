import { TaskDifficulty } from "@prisma/client";
import { motion } from "framer-motion";
import { useState } from "react";
import TaskCard from "~/components/TaskCard";
import ListInput from "~/components/input/ListInput";
import { useSession } from "next-auth/react";
import LoadingPage from "~/components/pages/LoadingPage";
import UserPageLayout from "~/layouts/UserPageLayout";
import { springTransition } from "~/utils/animations";
import { api } from "~/utils/api";
import { type taskCardInfo } from "~/utils/types";
import NotLoggedInPage from "~/components/pages/NotLoggedInPage";
import NotParticipantPage from "~/components/pages/NotParticipantPage";

const Room = () => {
  const { data: sessionData } = useSession();
  const requestData = api.tasks.getAllTasks.useQuery();
  const societies: string[] = [];

  for (const t of requestData.data || []) {
    if (!societies.includes(t.societyName)) {
      societies.push(t.societyName);
    }
  }

  const [filterDifficulty, updateFilterDifficulty] =
    useState("All difficulties");
  const [filterSociety, updateFilterSociety] = useState("All societies");
  const doFilter = (rawData: taskCardInfo[]) => {
    const intermediate: taskCardInfo[] = [];
    const result: taskCardInfo[] = [];
    for (const t of rawData) {
      if (filterSociety === "All societies") {
        intermediate.push(t);
      } else if (t.societyName == filterSociety) {
        intermediate.push(t);
      }
    }
    for (const t of intermediate) {
      if (filterDifficulty === "All difficulties") {
        result.push(t);
      } else if (filterDifficulty == t.taskDifficulty) {
        result.push(t);
      }
    }
    return result;
  };

  if (!(sessionData && sessionData.user)) return <NotLoggedInPage />;

  if (sessionData.user.type !== "PARTICIPANT") return <NotParticipantPage />;

  return requestData.isSuccess ? (
    <UserPageLayout headingText="Quests">
      <div className="m-auto w-full font-heading font-bold sm:w-4/5 md:w-[640px]">
        <p className="text-[#F38DB4]">Filter By:</p>
        <div className="grid grid-cols-2 space-x-2">
          <ListInput
            id="difficulty-filter"
            options={[
              "All difficulties",
              TaskDifficulty.Easy,
              TaskDifficulty.Medium,
              TaskDifficulty.Hard,
            ]}
            selectedOption="All difficulties"
            onSelect={(v) => {
              updateFilterDifficulty(v.toString());
            }}
          />
          <ListInput
            id="society-filter"
            options={["All societies", ...societies]}
            selectedOption="All societies"
            onSelect={(v) => {
              updateFilterSociety(v.toString());
            }}
          />
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-1 gap-8 py-8 md:grid-cols-3">
        {doFilter(requestData.data || []).map((task, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              ...springTransition,
              delay: index / 10,
            }}
          >
            <TaskCard key={index} data={task} userId={sessionData.user.id} />
          </motion.div>
        ))}
      </div>
    </UserPageLayout>
  ) : (
    <LoadingPage />
  );
};

export default Room;
