import { useState } from "react";
import { NextPage } from "next";
import Layout from "~/layouts/Layout";
import PageHeading from "~/components/PageHeading";
import TaskCard from "~/components/TaskCard";

import { taskInfo } from "~/utils/types";

const AllTasksPage: NextPage = () => {
  // TEST DATA - remove when API is ready
  let t1 = "COCKATOO"
  let t2 = "Cockatoo task"
  let t3 = "Cockatoo description"
  let t4 = "Cockatoo society"
  let t5 = "Cockatoo"
  let t6 = 10000

  let allTasks: taskInfo[] = []
  for (let i = 0; i < 4; i++) {
    allTasks.push({
      id: t1,
      isSponsorTask: false,
      title: t2,
      description: t3,
      society: t4,
      difficulty: "Easy",
      points: t6,
      userCompleted: false
    })
    allTasks.push({
      id: t1,
      isSponsorTask: true,
      title: t2,
      description: t3,
      society: t4,
      difficulty: "Medium",
      points: t6,
      userCompleted: false
    })
    allTasks.push({
      id: t1,
      isSponsorTask: false,
      title: t2,
      description: t3,
      society: t4,
      difficulty: "Hard",
      points: t6,
      userCompleted: false
    })
  }

  const sponsorsFirst = (a: taskInfo, b: taskInfo) => {
    if (a.isSponsorTask && b.isSponsorTask) {
      return 0
    } else if (a.isSponsorTask) {
      return -1
    } else if (b.isSponsorTask) {
      return 1
    } else {
      return 0
    }
  }
  allTasks.sort(sponsorsFirst)

  let [displayTasks, setDisplayTasks] = useState(allTasks)
  let filterDifficulty = ""
  let filterSociety = ""

  const filterTasks = () => {
    let intermediate: taskInfo[] = []
    let result: taskInfo[] = []
    for (let task of allTasks) {
      if (filterDifficulty != "" && filterDifficulty != "_") {
        if (task.difficulty == filterDifficulty) {
          intermediate.push(task)
        }
      } else {
        intermediate.push(task)
      }
    }

    for (let task of intermediate) {
      if (filterSociety != "" && filterSociety != "_") {
        if (task.society == filterSociety) {
          result.push(task)
        }
      } else {
        result.push(task)
      }
    }
    return result
  }

  const updateDifficultyFilter = (e: any) => {
    filterDifficulty = e.target.value
    setDisplayTasks(filterTasks())
  }

  const updateSocietyFilter = (e: any) => {
    filterSociety = e.target.value
    setDisplayTasks(filterTasks())
  }
  
  return (
    <>
    <Layout>
      <PageHeading heading="Quests" />
      <div className="w-full sm:w-4/5 md:w-[640px] m-auto p-4 font-heading font-bold">
        <p className="text-[#F38DB4]">Filter By:</p>
        <div className="flex space-x-2 md:space-x-8 pt-2">
          <select defaultValue="_" onChange={updateDifficultyFilter} className="appearance-none block w-full p-3 rounded-full bg-[#FFE5E5] border-4 border-[#F38DB4] text-center text-[#F38DB4]">
            <option value="_" disabled>Task difficulty</option>
            <option value="">All difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select defaultValue="_" onChange={updateSocietyFilter} className="appearance-none block w-full p-3 rounded-full bg-[#FFE5E5] border-4 border-[#F38DB4] text-center text-[#F38DB4]">
            <option value="_" disabled>Society</option>
            <option value="">All societies</option>
            <option value="Cockatoo society">Cockatoo society</option>
            <option value="Not a society">Not a society</option>
          </select>
        </div>
      </div>
      <div className="w-full sm:w-4/5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:w-[1280px] m-auto">
        {displayTasks.map(t => {return <TaskCard key={t.id} data={t}/>})}
      </div>
    </Layout>
    </>
  );

}

export default AllTasksPage