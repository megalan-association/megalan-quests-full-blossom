import { useSession } from "next-auth/react";
import Link from "next/link";
import ProgressBar from "~/components/ProgressBar";
import NotLoggedInPage from "~/components/pages/NotLoggedInPage";
import NotParticipantPage from "~/components/pages/NotParticipantPage";
import UserPageLayout from "~/layouts/UserPageLayout";
import { api } from "~/utils/api";

const Dashboard = () => {
  // get the rooms from the db
  const {data: sessionData} = useSession()
  const rooms = api.tasks.getRooms.useQuery();
  const rank = api.user.getRank.useQuery();
  const progress = api.user.getProgress.useQuery();
  console.log(progress)
  let roomsData = rooms.data;
  if (!roomsData?.length) {
    roomsData = [{ name: "no data" }];
  }

  if (!(sessionData && sessionData.user)) return <NotLoggedInPage />

  if (sessionData.user.type !== "PARTICIPANT") return <NotParticipantPage />;

  return (
    <UserPageLayout headingText="Dashboard">
      <section
        id="rank-progress"
        className="w-full space-y-6 xs:p-4 md:space-y-8"
      >
        <div className="flex flex-row items-end justify-between">
          <h1 className="font-heading text-2xl font-semibold text-brown md:text-5xl ">
            Rank
          </h1>
          <p className="font-heading text-5xl font-semibold text-pink md:text-7xl">
            #{rank.data}
          </p>
        </div>
          {progress && progress.data?.allPoints ? 
        <div className="space-y-4 md:space-y-8">
          <div className="flex flex-row items-end justify-between">
            <h1 className="font-heading text-2xl font-semibold text-brown md:text-5xl ">
              Progress
            </h1>
            <p className="font-heading text-2xl font-semibold text-green md:text-5xl">
              {Math.round(((progress.data.userPoints ?? 0 ) / progress.data.allPoints) * 100)}%
            </p>
          </div>
          <ProgressBar points={progress.data.userPoints?? 0} totalPoints={progress.data.allPoints} />  
        </div>
        : <>Progress: Loading</> }
        
      </section>
      <section
        id="rooms-selector"
        className="flex w-full flex-col space-y-4 xs:px-4 md:space-y-8"
      >
        <h1 className="font-heading text-2xl font-semibold text-brown md:text-5xl ">
          Tasks
        </h1>
        <div className="grid aspect-square h-fit w-full grid-flow-row grid-cols-3 gap-2 md:aspect-auto md:gap-4">
          <Link
            href={`/user/allTasks`}
            as={`/user/allTasks`}
            key={0}
            className="col-span-3 row-span-1 flex h-24 flex-col items-center justify-center rounded-xl border border-pink/40 bg-gradient-to-br from-light-pink to-pink p-4 md:aspect-auto md:p-8"
          >
            <p className="text-body text-center text-lg leading-4 text-brown md:text-3xl">
              All Tasks
            </p>
          </Link>
          {roomsData.map((room, index) => (
            <Link
              href={`/rooms/[room]`}
              as={`/rooms/${room.name}`}
              key={index}
              className="col-span-1 row-span-1 flex aspect-square flex-col items-center justify-center rounded-xl border border-pink/40 bg-light-pink p-4 md:aspect-auto md:p-8"
            >
              <p className="text-body text-center text-lg leading-4 text-pink md:text-3xl">
                {room.name}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </UserPageLayout>
  );
};

export default Dashboard;
