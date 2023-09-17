import { useSession } from "next-auth/react";
import Image from "next/image";
import RaffleWinnerRevealCard from "~/components/RaffleWinnerRevealCard";
import NotLoggedInPage from "~/components/pages/NotLoggedInPage";
import Layout from "~/layouts/Layout";
import { api } from "~/utils/api";

const Raffle = () => {
  // api call here to get winner

  const users = api.tasks.getLeaderBoard.useQuery();

  if (!users.data) return <NotLoggedInPage />;
  return (
    <Layout>
      <div className="relative flex h-full min-h-screen w-full flex-col">
        <div className="flex flex-col items-center justify-center space-y-16 py-16">
          <div className="z-40 flex h-full w-full flex-row items-center md:container">
            <h1 className="w-fit bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75% bg-clip-text text-center font-heading text-3xl font-bold text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] md:text-6xl">
              Raffle Winners
            </h1>
            <Image
              className="h-14 w-fit object-contain"
              src="/h1-petals.png"
              alt="flowers"
              width={250}
              height={150}
            />
            <Image
              className="h-14 w-fit object-contain"
              src="/h1-petals.png"
              alt="flowers"
              width={250}
              height={150}
            />
          </div>
          <div className="z-40 flex h-full w-full flex-row items-center justify-center space-x-8 px-16">
            <RaffleWinnerRevealCard
              category="#1"
              winner={{
                id: users.data[0]?.id ?? "",
                image: users.data[0]?.image ?? "",
                name: users.data[0]?.name ?? "name",
              }}
            />
            <RaffleWinnerRevealCard
              category="#2"
              winner={{
                id: users.data[1]?.id ?? "",
                image: users.data[1]?.image ?? "",
                name: users.data[1]?.name ?? "name",
              }}
            />
            <RaffleWinnerRevealCard
              category="#3"
              winner={{
                id: users.data[2]?.id ?? "",
                image: users.data[2]?.image ?? "",
                name: users.data[2]?.name ?? "name",
              }}
            />
          </div>
          <div className="z-40 flex h-full w-full flex-row items-center justify-center space-x-8 px-16 ">
            <RaffleWinnerRevealCard
              category="#4"
              winner={{
                id: users.data[3]?.id ?? "",
                image: users.data[3]?.image ?? "",
                name: users.data[3]?.name ?? "name",
              }}
            />
            <RaffleWinnerRevealCard
              category="#5"
              winner={{
                id: users.data[4]?.id ?? "",
                image: users.data[4]?.image ?? "",
                name: users.data[4]?.name ?? "name",
              }}
            />
          </div>
        </div>
        <Image
          className="absolute bottom-0 z-0 h-full w-full object-cover blur-sm"
          src="/cherry-bg-full.png"
          alt="flowers"
          width={250}
          height={150}
        />
      </div>
    </Layout>
  );
};

export default Raffle;
