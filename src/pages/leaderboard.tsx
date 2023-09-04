import PaginatedTable from "~/components/PaginatedTable";
import BackgroundImageLayout from "~/layouts/BackgroudImageLayout";

const Leaderboard = () => {
  return (
    <BackgroundImageLayout headerText="Leaderboard" imageURL="/cherry-bg.png">
      <div className="flex h-full w-full flex-row justify-center">
        <div className="w-full md:container">
          <PaginatedTable />
        </div>
      </div>
    </BackgroundImageLayout>
  );
};
export default Leaderboard;
