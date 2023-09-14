import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { isServer } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

interface User {
  id: string;
  name: string | null;
  image: string | null;
  totalPoints: number;
}

const pageSize = 10; // Number of rows per page

// const generateRandomUserData = (count: number): User[] => {
//   const users: User[] = [];
//   const profilePicture =
//     "https://cdn.discordapp.com/avatars/756052899804479519/66cf284f32de43e56b468fa5113611aa.png";

//   for (let i = 0; i < count; i++) {
//     const user: User = {
//       id: `${i + 1}`,
//       name: `User ${i + 1}`,
//       image: profilePicture,
//       points: Math.floor(Math.random() * 1000), // Random points between 0 and 999
//     };
//     users.push(user);
//   }

//   return users;
// };

const PaginatedTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  // const [data, setData] = useState<User[]>([]);
  const users = api.tasks.getLeaderBoard.useQuery();

  const data: User[] = users.data ?? [];



  // useEffect(() => {
  //   if (!isServer) {
  //     // Generate random user data on the client side
  //     const randomData = generateRandomUserData(50);
  //     randomData.sort((a, b) => {
  //       return a.points > b.points ? -1 : 1;
  //     });
  //     setData(randomData);
  //   }
  // }, []);


  const totalPages = Math.ceil(data.length / pageSize);

  const startIndex = currentPage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-4">
      <div className="overflow-hidden rounded-2xl border-4 border-light-pink">
        <table className="w-full table-auto border-collapse">
          <thead className="">
            <tr className=" border-b-2 border-light-pink bg-light-green/60 font-heading text-brown">
              <th className="px-4 py-2 text-center text-2xl font-semibold">
                Rank
              </th>
              <th className="px-4 py-2 text-center text-2xl font-semibold">
                User
              </th>
              <th className="px-4 py-2 text-center text-2xl font-semibold">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user, index) => (
              <tr
                key={user.id}
                className="bg-pink/80 text-center text-lg font-semibold text-light-pink "
              >
                <td className="border-b-2 border-light-pink px-4 py-2">
                  {startIndex + index + 1}
                </td>
                <td className="border-b-2 border-light-pink px-4 py-2">
                  <div className="flex items-center justify-center space-x-2">
                    {user.image && user.name?
                      <Image
                        width={100}
                        height={100}
                        src={user.image}
                        alt={user.name}
                        className="h-8 w-8 rounded-full"
                      /> :
                      <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-500" />
                    }
                    <p>{user.name}</p>
                  </div>
                </td>
                <td className="border-b-2 border-light-pink px-4 py-2">
                  {user.totalPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row items-center justify-between pt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="text-heading rounded-2xl border-2 border-light-pink bg-pink px-4 py-2 text-lg font-semibold text-light-pink"
        >
          <ArrowLeftIcon className="h-6 w-6 text-light-pink" />
        </button>
        <div>
          <p className="font-heading text-2xl font-semibold text-pink">
            Page {currentPage + 1} of {totalPages}
          </p>
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="text-heading rounded-2xl border-2 border-light-pink bg-pink px-4 py-2 text-lg font-semibold text-light-pink"
        >
          <ArrowRightIcon className="h-6 w-6 text-light-pink" />
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
