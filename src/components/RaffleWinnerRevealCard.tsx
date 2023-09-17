import Image from "next/image";
import { useState } from "react";
import { useConfetti } from "use-confetti-svg";

interface Props {
  winner: {
    id: string;
    name: string;
    image: string;
  };
  category: string;
}

const RaffleWinnerRevealCard: React.FC<Props> = ({ winner, category }) => {
  const [loading, setLoading] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [animating, setAnimating] = useState(false);

  const { runAnimation } = useConfetti({
    images: [
      {
        src: "/cherry-1.png",
        size: 64,
        weight: 5,
      },
      {
        src: "/cherry-2.png",
        size: 72,
        weight: 3,
      },
      {
        src: "/cherry-3.png",
        size: 64,
        weight: 5,
      },
      {
        src: "/cherry-4.png",
        size: 56,
        weight: 3,
      },
    ],
    duration: 10000,
    fadeOut: 2000,
    rotate: true,
    particleCount: 100,
  });

  const handleRunAnimation = () => {
    console.log(animating);
    setAnimating(true);
    runAnimation().then(() => {
      setAnimating(false);
    });
  };

  return (
    <div className="block h-96 w-96 max-w-xl rounded-2xl bg-gradient-to-b from-yellow-900 to-[#CCC786] p-2">
      <div className="flex h-full w-full flex-col gap-2">
        <div className="relative rounded-t-xl bg-white">
          <div className="pointer-events-none absolute -right-4 -top-6 flex h-full w-full flex-row items-end justify-end">
            <Image
              alt="flower"
              src="/cherry-4.png"
              width={150}
              height={150}
              className="h-fit w-14 object-contain"
            />
          </div>
          <div className="flex w-full flex-row items-center justify-start space-x-4 px-4 py-2">
            <h1 className="font-heading text-xl font-medium text-brown md:text-3xl">
              Winner {category}
            </h1>
          </div>
        </div>
        <div className="relative flex h-full flex-row items-center justify-center space-y-2 bg-[#FDB3C2]">
          {loading ? (
            <div className="flex w-full flex-col items-center justify-center">
              <svg
                className="my-8 h-24 w-24 animate-spin text-pink"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : (
            <>
              {!reveal ? (
                <button
                  onClick={() => {
                    setReveal(true);
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      handleRunAnimation();
                    }, 2500);
                  }}
                  className="background-animate transform rounded-3xl bg-light-pink px-8 py-4 font-heading text-2xl font-semibold text-brown transition-all hover:scale-105 hover:bg-gradient-to-r hover:from-pink hover:via-rose-500 hover:to-fuchsia-600 hover:text-white"
                >
                  Reveal Winner
                </button>
              ) : (
                <div className="flex h-full w-full flex-row items-center justify-center gap-4 px-4 py-2">
                  <div className="flex flex-row items-center justify-center gap-4">
                    <div className="h-20 w-20 flex-shrink-0 rounded-full bg-gradient-to-br from-pink/40 to-pink/80 p-1 drop-shadow-lg">
                      {winner.image ? (
                        <Image
                          alt="society logo"
                          src={winner.image}
                          width={150}
                          height={150}
                          className="h-full w-full flex-shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-500" />
                      )}
                    </div>
                    <div className="overflow-y-auto">
                      <h2 className="font-heading text-xl font-medium text-brown md:text-3xl">
                        {winner.name}
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div className="pointer-events-none absolute -bottom-6 -left-6 flex h-full w-full flex-row items-end justify-start">
            <Image
              alt="flower"
              src="/cherry-2.png"
              width={150}
              height={150}
              className="h-fit w-20 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RaffleWinnerRevealCard;
