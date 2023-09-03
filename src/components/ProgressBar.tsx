import Image from "next/image";
interface Props {
  points: number;
  totalPoints: number;
}

const ProgressBar: React.FC<Props> = ({ points, totalPoints }) => {
  const widthPercentage = (points / totalPoints) * 100;
  console.log(widthPercentage);
  return (
    <div className="flex h-10 w-full flex-row rounded-2xl bg-green drop-shadow">
      <div className="flex w-full flex-row items-center">
        <div
          className="relative flex h-10 flex-col items-end justify-center rounded-2xl bg-light-green"
          style={{ width: `${widthPercentage}%` }}
        >
          {widthPercentage > 50 && (
            <p className="w-full px-4 text-left font-body font-semibold text-green">
              {points} / {totalPoints}
            </p>
          )}
          <Image
            src="/flower-petals.png"
            alt="Header banner"
            width={250}
            height={200}
            className="absolute h-20 w-fit translate-x-8"
          />
        </div>
      </div>
      <div
        className=" flex h-10 flex-col items-center justify-center rounded-2xl bg-green "
        style={{ width: `${100 - widthPercentage}%` }}
      >
        {widthPercentage < 50 && (
          <p className="font-body font-semibold text-light-green">
            {points} / {totalPoints}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
