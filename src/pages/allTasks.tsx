import { type NextPage } from "next";
import { useState } from "react";
import Layout from "~/layouts/Layout";
import PageHeading from "~/components/PageHeading";
import TaskCard from "~/components/TaskCard";

import type { taskInfo } from "~/utils/types";

const AllTasksPage: NextPage = () => {
  // TEST DATA - remove when API is ready
  const testTitle = "Cockatoo task"
  const testDescription = "Cockatoo description"
  const testSociety = "Cockatoo society"
  const testPoints = 10000

  const allTasks: taskInfo[] = []
  for (let i = 0; i < 4; i++) {
    allTasks.push({
      id: String(i),
      isSponsorTask: false,
      title: testTitle,
      description: testDescription,
      society: testSociety,
      difficulty: "Easy",
      points: testPoints,
      userCompleted: false
    })
    allTasks.push({
      id: String(i),
      isSponsorTask: true,
      title: testTitle,
      description: testDescription,
      society: testSociety,
      difficulty: "Medium",
      points: testPoints,
      userCompleted: false
    })
    allTasks.push({
      id: String(i),
      isSponsorTask: false,
      title: testTitle,
      description: testDescription,
      society: testSociety,
      difficulty: "Hard",
      points: testPoints,
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

  const [displayTasks, setDisplayTasks] = useState(allTasks)
  let filterDifficulty = ""
  let filterSociety = ""

  const filterTasks = () => {
    const intermediate: taskInfo[] = []
    const result: taskInfo[] = []
    for (const task of allTasks) {
      if (filterDifficulty != "" && filterDifficulty != "_") {
        if (task.difficulty == filterDifficulty) {
          intermediate.push(task)
        }
      } else {
        intermediate.push(task)
      }
    }

    for (const task of intermediate) {
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

  return (
    <>
    <Layout>
      <PageHeading heading="Quests" />
      <div className="w-full sm:w-4/5 md:w-[640px] m-auto p-4 font-heading font-bold">
        <p className="text-[#F38DB4]">Filter By:</p>
        <div className="flex space-x-2 md:space-x-8 pt-2">
          <select defaultValue="_" onChange={(e) => {
            filterDifficulty = e.target.value
            setDisplayTasks(filterTasks())
          }} className="appearance-none block w-full p-3 rounded-full bg-[#FFE5E5] border-4 border-[#F38DB4] text-center text-[#F38DB4]">
            <option value="_" disabled>Task difficulty</option>
            <option value="">All difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select defaultValue="_" onChange={(e) => {
            filterSociety = e.target.value
            setDisplayTasks(filterTasks())
          }} className="appearance-none block w-full p-3 rounded-full bg-[#FFE5E5] border-4 border-[#F38DB4] text-center text-[#F38DB4]">
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
