import type { taskInfo } from "~/utils/types";

const TaskCard = ({data}: {data: taskInfo}) => {
  return (<>
    <div className="w-full h-72 p-4 font-heading font-bold">
      <div className="w-full h-full flex flex-col space-y-2 p-2 items-center rounded-2xl bg-gradient-to-b from-yellow-900  to-[#CCC786]">
        <div className="w-full rounded-2xl">
          <div className="w-full p-2 bg-white rounded-t-xl flex flex-row space-x-2 ">
            {/* TEMPORARY IMAGE - remove when society logos are available */}
            <img className="h-12 my-0.5 rounded-full" src="https://avatars.githubusercontent.com/u/89776086?v=4" alt="Society logo" />
            <div>
              <h4 className=" text-yellow-900 text-xl font-bold">{data.title}</h4>
              <p className="text-pink">{data.society}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex-grow p-2 rounded-b-xl bg-[#fdb3c2] grid grid-rows-[1fr_auto]">
          <div>
            <p className="text-brown">{data.points} points upon completion!</p>
            <p className="text-brown">{data.description}</p>
          </div>
          <p className=" text-right text-[#ea5873]">Difficulty: {data.difficulty}</p>
        </div>
      </div>
    </div>
  </>);
}

export default TaskCard
