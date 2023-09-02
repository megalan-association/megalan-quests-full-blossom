import { taskInfo } from "~/utils/types";

// const props = { taskId: string, title: string, socName: string, desc: string, diff: string, compStat: boolean};

const TaskCard = (data: taskInfo) => {
  // task id
  // title
  // society name
  // description 
  // difficulty
  // completedStatus

  // onClick => show the qr 
  // conditional (if completed, make the border green and unclickable)


  return (<>
    <div className="w-full h-72 p-4 font-heading font-bold">
      <div className="w-full h-full flex flex-col space-y-2 p-2 items-center rounded-2xl bg-gradient-to-b from-yellow-900  to-[#CCC786]">
        <div className="w-full rounded-2xl">
          <div className="w-full p-2 bg-white rounded-t-xl flex flex-row space-x-2 ">
            {/* TEMPORARY IMAGE */}
            <img className="h-12 my-0.5 rounded-full" src="https://avatars.githubusercontent.com/u/89776086?v=4" alt="Society logo" />
            <div>
              <h4 className=" text-yellow-900 text-xl font-bold">{data.title}</h4>
              <p className="text-pink">{data.society}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex-grow p-2 rounded-b-xl bg-[#fdb3c2] grid grid-rows-[1fr_auto]">
          <div>
            <p className="text-light-pink">{data.points} points upon completion!</p>
            <p className="text-light-pink">{data.description}</p>
          </div>
          <p className=" text-right text-[#ea5873]">Difficulty: {data.difficulty}</p>
        </div>
      {/* <div className="w-80 h-44 left-[30px] top-[92px] absolute bg-pink-300 rounded-bl-2xl rounded-br-2xl border-2 border-yellow-900" />
      <div className="w-80 h-14 left-[30px] top-[34px] absolute bg-white rounded-tl-2xl rounded-tr-2xl border-2 border-yellow-900" />
      <div className="w-10 h-10 left-[42px] top-[43px] absolute bg-zinc-300 rounded-full" />
      <div className="w-44 h-6 left-[91px] top-[44px] absolute text-yellow-900 text-xl font-normal">{title}</div>
      <div className="w-44 h-6 left-[91px] top-[69px] absolute text-red-400 text-base font-normal">{socName}</div>
      <div className="w-44 h-6 left-[193px] top-[244px] absolute text-red-400 text-base font-normal">Task Difficulty: {diff}</div>
      <div className="w-60 h-11 left-[41px] top-[108px] absolute text-rose-100 text-base font-normal">{points} Points upon completion<br />{desc}<br /></div> */}
      {/* <img className="w-28 h-20 left-0 top-[200px] absolute" src="https://via.placeholder.com/110x88" /> */}
      {/* <img className="w-20 h-20 left-[312px] top-0 absolute" src="https://via.placeholder.com/80x88" /> */}
      </div>
    </div>
  </>);
}


export default TaskCard