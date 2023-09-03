import { type GetStaticProps, type GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import TaskCard from "~/components/TaskCard";
import UserPageLayout from "~/layouts/UserPageLayout";
import { roomsList } from "~/utils/constants";
import { type taskInfo } from "~/utils/types";

interface Task {
  id: string;
  name: string;
}

interface RoomPageProps {
  tasks: Task[];
}

const Room = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { room } = router.query; // Updated parameter name
  console.log(room);
  const testTitle = "Cockatoo task";
  const testDescription = "Cockatoo description";
  const testSociety = "Cockatoo society";
  const testPoints = 10000;

  const allTasks: taskInfo[] = [];
  for (let i = 0; i < 4; i++) {
    allTasks.push({
      id: String(i),
      isSponsorTask: false,
      title: testTitle,
      description: testDescription,
      society: testSociety,
      difficulty: "Easy",
      points: testPoints,
      userCompleted: false,
    });
    allTasks.push({
      id: String(i),
      isSponsorTask: true,
      title: testTitle,
      description: testDescription,
      society: testSociety,
      difficulty: "Medium",
      points: testPoints,
      userCompleted: false,
    });
    allTasks.push({
      id: String(i),
      isSponsorTask: false,
      title: testTitle,
      description: testDescription,
      society: testSociety,
      difficulty: "Hard",
      points: testPoints,
      userCompleted: false,
    });
  }

  const sponsorsFirst = (a: taskInfo, b: taskInfo) => {
    if (a.isSponsorTask && b.isSponsorTask) {
      return 0;
    } else if (a.isSponsorTask) {
      return -1;
    } else if (b.isSponsorTask) {
      return 1;
    } else {
      return 0;
    }
  };
  allTasks.sort(sponsorsFirst);

  const [displayTasks, setDisplayTasks] = useState(allTasks);
  let filterDifficulty = "";
  let filterSociety = "";

  const filterTasks = () => {
    const intermediate: taskInfo[] = [];
    const result: taskInfo[] = [];
    for (const task of allTasks) {
      if (filterDifficulty != "" && filterDifficulty != "_") {
        if (task.difficulty == filterDifficulty) {
          intermediate.push(task);
        }
      } else {
        intermediate.push(task);
      }
    }

    for (const task of intermediate) {
      if (filterSociety != "" && filterSociety != "_") {
        if (task.society == filterSociety) {
          result.push(task);
        }
      } else {
        result.push(task);
      }
    }
    return result;
  };

  return (
    <UserPageLayout headingText="Quests">
      <div className="m-auto w-full p-4 font-heading font-bold sm:w-4/5 md:w-[640px]">
        <p className="text-[#F38DB4]">Filter By:</p>
        <div className="flex space-x-2 pt-2 md:space-x-8">
          <select
            defaultValue="_"
            onChange={(e) => {
              filterDifficulty = e.target.value;
              setDisplayTasks(filterTasks());
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
              filterSociety = e.target.value;
              setDisplayTasks(filterTasks());
            }}
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
      <div className="m-auto grid w-full grid-cols-1 sm:w-4/5 md:grid-cols-2 xl:grid-cols-3 2xl:w-[1280px]">
        {displayTasks.map((t) => {
          return <TaskCard key={t.id} data={t} />;
        })}
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
