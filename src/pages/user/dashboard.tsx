import Link from "next/link";
import UserPageLayout from "~/layouts/UserPageLayout";
import { roomsList } from "~/utils/constants";

const dashboard = () => {
  const rooms = roomsList;

  return (
    <UserPageLayout headingText="Quests">
      <section id="rank-progress" className="w-full space-y-6 p-8">
        <div className="flex flex-row items-end justify-between">
          <h1 className="font-heading text-2xl font-semibold text-brown ">
            Rank
          </h1>
          <p className="font-heading text-5xl font-semibold text-pink">#10</p>
        </div>
        <div className="space-y-4">
          <div className="flex flex-row items-end justify-between">
            <h1 className="font-heading text-2xl font-semibold text-brown ">
              Progress
            </h1>
            <p className="font-heading text-2xl font-semibold text-green">
              60%
            </p>
          </div>
          <div className="h-10 w-full rounded-2xl bg-green drop-shadow"></div>
        </div>
      </section>
      <section
        id="rooms-selector"
        className="flex w-full flex-col space-y-4 px-8"
      >
        <h1 className="font-heading text-2xl font-semibold text-brown ">
          Tasks
        </h1>
        <div className="grid aspect-square h-fit w-full grid-flow-row grid-cols-3 gap-2">
          <div className="col-span-1 row-span-1 flex aspect-square flex-col items-center justify-center rounded-xl border border-pink/40 bg-gradient-to-br from-light-pink to-pink p-4">
            <p className="text-body text-center text-lg leading-4 text-brown">
              All Tasks
            </p>
          </div>
          {rooms.map((room, index) => (
            <Link
              href={`/rooms/[room]`}
              as={`/rooms/${room}`}
              key={index}
              className="col-span-1 row-span-1 flex aspect-square flex-col items-center justify-center rounded-xl border border-pink/40 bg-light-pink p-4"
            >
              <p className="text-body text-center text-lg leading-4 text-brown">
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
