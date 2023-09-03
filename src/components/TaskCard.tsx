import Image from "next/image";
import type { taskInfo } from "~/utils/types";

const TaskCard = ({ data }: { data: taskInfo }) => {
  return (
    <>
      <div className="h-72 w-full p-4 font-heading font-bold">
        <div className="flex h-full w-full flex-col items-center space-y-2 rounded-2xl bg-gradient-to-b from-yellow-900 to-[#CCC786]  p-2">
          <div className="w-full rounded-2xl">
            <div className="flex w-full flex-row space-x-2 rounded-t-xl bg-white p-2 ">
              {/* TEMPORARY IMAGE - remove when society logos are available */}
              <Image
                className="my-0.5 h-12 w-12 rounded-full"
                width={250}
                height={250}
                src="https://avatars.githubusercontent.com/u/89776086?v=4"
                alt="Society logo"
              />
              <div>
                <h4 className=" text-xl font-bold text-yellow-900">
                  {data.title}
                </h4>
                <p className="text-pink">{data.society}</p>
              </div>
            </div>
          </div>
          <div className="grid h-full w-full flex-grow grid-rows-[1fr_auto] rounded-b-xl bg-[#fdb3c2] p-2">
            <div>
              <p className="text-brown">
                {data.points} points upon completion!
              </p>
              <p className="text-brown">{data.description}</p>
            </div>
            <p className=" text-right text-[#ea5873]">
              Difficulty: {data.difficulty}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
