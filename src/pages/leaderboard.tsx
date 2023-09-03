import PaginatedTable from "~/components/PaginatedTable";
import BackgroundImageLayout from "~/layouts/BackgroudImageLayout";

const Leaderboard = () => {
  return (
    <BackgroundImageLayout headerText="Leaderboard" imageURL="/cherry-bg.png">
      <h1 className="">Leaderboard</h1>
      <PaginatedTable />
    </BackgroundImageLayout>
  );
};
export default Leaderboard;
