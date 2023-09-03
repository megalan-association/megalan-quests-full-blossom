import { type GetStaticProps, type GetStaticPaths } from "next";
import { useRouter } from "next/router";
import UserPageLayout from "~/layouts/UserPageLayout";
import { api } from "~/utils/api";
import { roomsList } from "~/utils/constants";

interface Task {
  id: string;
  name: string;
}

interface RoomPageProps {
  tasks: Task[];
}

const room = ({ tasks }: RoomPageProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { room } = router.query; // Updated parameter name

  return (
    <UserPageLayout headingText="Quests">
      <div>{room}</div> {/* Updated variable name */}
      <div>{tasks.toString()}</div>
    </UserPageLayout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  // Return a list of possible values for room
  const paths = roomsList.map((room) => ({
    params: { room: room }, // Updated parameter name
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<RoomPageProps> = ({ params }) => {
  // Fetch necessary data for the blog post using params.room
  console.log(params);

  //   const { data: roomData } = api.example.hello.useQuery({
  //     text: params.room,
  //   });

  return {
    props: {
      tasks: [
        {
          id: "1",
          name: "dummy task 1",
        },
        {
          id: "2",
          name: "dummy task 2",
        },
      ],
    },
  };
};

export default room;
