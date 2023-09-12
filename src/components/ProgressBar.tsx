import Image from "next/image";
interface Props {
  points: number;
  totalPoints: number;
}

const ProgressBar: React.FC<Props> = ({ points, totalPoints }) => {
  const progressPercentage = (points / totalPoints) * 100;

  return (
    <div className="relative h-10 w-full rounded-xl bg-light-green">
      <div
        className="relative h-full rounded-2xl bg-green"
        style={{ width: `${progressPercentage}%` }}
      >
        <Image
          src="/flower-petals.png"
          alt="Header banner"
          width={250}
          height={200}
          className="float-right h-20 w-fit flex-shrink-0 -translate-y-5 translate-x-8 object-contain"
        />
      </div>
      <p className="absolute w-full whitespace-nowrap font-heading text-green">
        {points} / {totalPoints} xp
      </p>
    </div>
  );
};

export default ProgressBar;
