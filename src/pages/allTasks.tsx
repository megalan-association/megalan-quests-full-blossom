import { NextPage } from "next";
import TaskCard from "~/components/TaskCard";
import Layout from "~/layouts/Layout";

const AllTasksPage: NextPage = () => {

  // after the api call to the tasks
  // list of all the tasks 
  // const allTasks: unknown[] = [];



  
  


  // Title
  // searchbar 
  // Filter section 
  // List of the Tasks 
  return (
    <>
    {/* {allTasks.map(t => {return <TaskCard taskId={t.id}/>})} */}
    <Layout>
      <TaskCard taskId={"T1234"} title={"Test Task"} socName={"BestSoc"} desc={"super hard challenge "} diff={"Hard"} compStat={false} points={1000} />
    </Layout>
    </>
  );

}

export default AllTasksPage