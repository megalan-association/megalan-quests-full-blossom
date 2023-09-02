import { useState } from "react";
import { NextPage } from "next";
import Layout from "~/layouts/Layout";
import TaskCard from "~/components/TaskCard";

import { taskInfo } from "~/utils/types";

const AllTasksPage: NextPage = () => {

  // after the api call to the tasks
  // list of all the tasks 
  // const allTasks: unknown[] = [];

  // Title
  // searchbar 
  // Filter section 
  // List of the Tasks 

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
      title: t2,
      description: t3,
      society: t4,
      difficulty: "Easy",
      points: t6,
      userCompleted: false
    })
    allTasks.push({
      id: t1,
      title: t2,
      description: t3,
      society: t4,
      difficulty: "Medium",
      points: t6,
      userCompleted: false
    })
    allTasks.push({
      id: t1,
      title: t2,
      description: t3,
      society: t4,
      difficulty: "Hard",
      points: t6,
      userCompleted: false
    })
  }

  let [displayTasks, setDisplayTasks] = useState(allTasks)
  let filterDifficulty = ""
  let filterSociety = ""

  function filterTasks() {
    let intermediate: taskInfo[] = []
    let result: taskInfo[] = []
    for (let task of allTasks) {
      if (filterDifficulty != "") {
        if (task.difficulty == filterDifficulty) {
          intermediate.push(task)
        }
      } else {
        intermediate.push(task)
      }
    }

    for (let task of intermediate) {
      if (filterSociety != "") {
        if (task.society == filterSociety) {
          result.push(task)
        }
      } else {
        result.push(task)
      }
    }
    return result
  }

  function updateDifficultyFilter(e: any) {
    filterDifficulty = e.target.value
    setDisplayTasks(filterTasks())
  }

  function updateSocietyFilter(e: any) {
    filterSociety = e.target.value
    setDisplayTasks(filterTasks())
  }
  
  return (
    <>
    <Layout>
      <h1 className="text-center font-heading font-bold text-5xl text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] bg-clip-text bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75%">Quests</h1>
      <div className="w-full sm:w-4/5 md:w-[640px] m-auto p-4 font-heading font-bold">
        <p className="text-[#F38DB4]">Filter By:</p>
        <div className="flex space-x-2 md:space-x-8 pt-2">
          <select onChange={updateDifficultyFilter} className="appearance-none block w-full p-3 rounded-full bg-[#FFE5E5] border-4 border-[#F38DB4] text-center text-[#F38DB4]">
            <option value="" selected disabled>Task difficulty</option>
            <option value="">All difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select onChange={updateSocietyFilter} className="appearance-none block w-full p-3 rounded-full bg-[#FFE5E5] border-4 border-[#F38DB4] text-center text-[#F38DB4]">
            <option value="" selected disabled>Society</option>
            <option value="">All societies</option>
            <option value="Cockatoo society">Cockatoo society</option>
            <option value="Not a society">Not a society</option>
          </select>
        </div>
      </div>
      <div className="w-full sm:w-4/5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:w-[1280px] m-auto">
        {displayTasks.map(t => {return <TaskCard id={t.id} title={t.title} description={t.description} society={t.society} difficulty={t.difficulty} points={t.points} userCompleted={false}/>})}
      </div>
    </Layout>
    </>
  );

}

export default AllTasksPage