import { NextPage } from "next";
import TaskCard from "~/components/TaskCard";

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
  return (
    <>
    <div className="w-full sm:w-4/5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:w-[1280px] m-auto">
      {/* {allTasks.map(t => {return <TaskCard taskId={t.id}/>})} */}
      <TaskCard id={t1} title={t2} description={t3} society={t4} difficulty={t5} points={t6} userCompleted={false} />
      <TaskCard id={t1} title={t2} description={t3} society={t4} difficulty={t5} points={t6} userCompleted={false} />
      <TaskCard id={t1} title={t2} description={t3} society={t4} difficulty={t5} points={t6} userCompleted={false} />
      <TaskCard id={t1} title={t2} description={t3} society={t4} difficulty={t5} points={t6} userCompleted={false} />
      <TaskCard id={t1} title={t2} description={t3} society={t4} difficulty={t5} points={t6} userCompleted={false} />
      <TaskCard id={t1} title={t2} description={t3} society={t4} difficulty={t5} points={t6} userCompleted={false} />
      <TaskCard id={t1} title={t2} description={t3} society={t4} difficulty={t5} points={t6} userCompleted={false} />
      <TaskCard id={t1} title={t2} description={t3} society={t4} difficulty={t5} points={t6} userCompleted={false} />
      <TaskCard id={t1} title={t2} description={t3} society={t4} difficulty={t5} points={t6} userCompleted={false} />
      <TaskCard id={t1} title={t2} description={t3} society={t4} difficulty={t5} points={t6} userCompleted={false} />
      <TaskCard id={t1} title={t2} description={t3} society={t4} difficulty={t5} points={t6} userCompleted={false} />
      <TaskCard id={t1} title={t2} description={t3} society={t4} difficulty={t5} points={t6} userCompleted={false} />
    </div>
    
    </>
  );

}

export default AllTasksPage