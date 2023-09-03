import Link from "next/link";
import ProgressBar from "~/components/ProgressBar";
import UserPageLayout from "~/layouts/UserPageLayout";
import { roomsList } from "~/utils/constants";

const dashboard = () => {
  const rooms = roomsList;

  return (
    <UserPageLayout headingText="Quests">
      <section
        id="rank-progress"
        className="w-full space-y-6 p-4 xs:p-8 md:space-y-8"
      >
        <div className="flex flex-row items-end justify-between">
          <h1 className="font-heading text-2xl font-semibold text-brown md:text-5xl ">
            Rank
          </h1>
          <p className="font-heading text-5xl font-semibold text-pink md:text-7xl">
            #10
          </p>
        </div>
        <div className="space-y-4 md:space-y-8">
          <div className="flex flex-row items-end justify-between">
            <h1 className="font-heading text-2xl font-semibold text-brown md:text-5xl ">
              Progress
            </h1>
            <p className="font-heading text-2xl font-semibold text-green md:text-5xl">
              60%
            </p>
          </div>
          <ProgressBar points={8000} totalPoints={10000} />
        </div>
      </section>
      <section
        id="rooms-selector"
        className="flex w-full flex-col space-y-4 px-4 xs:px-8 md:space-y-8"
      >
        <h1 className="font-heading text-2xl font-semibold text-brown md:text-5xl ">
          Tasks
        </h1>
        <div className="grid aspect-square h-fit w-full grid-flow-row grid-cols-3 gap-2 md:aspect-auto md:gap-4">
          <div className="col-span-1 row-span-1 flex aspect-square flex-col items-center justify-center rounded-xl border border-pink/40 bg-gradient-to-br from-light-pink to-pink p-4 md:aspect-auto md:p-8">
            <p className="text-body text-center text-lg leading-4 text-brown md:text-3xl">
              All Tasks
            </p>
          </div>
          {rooms.map((room, index) => (
            <Link
              href={`/rooms/[room]`}
              as={`/rooms/${room}`}
              key={index}
              className="col-span-1 row-span-1 flex aspect-square flex-col items-center justify-center rounded-xl border border-pink/40 bg-light-pink p-4 md:aspect-auto md:p-8"
            >
              <p className="text-body text-center text-lg leading-4 text-pink md:text-3xl">
                {room}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </UserPageLayout>
  );
};

export default dashboard;
