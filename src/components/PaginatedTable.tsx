import { isServer } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  profilepicture: string;
  points: number;
}

const pageSize = 10; // Number of rows per page

const generateRandomUserData = (count: number): User[] => {
  const users: User[] = [];
  const profilePicture =
    "https://cdn.discordapp.com/avatars/756052899804479519/66cf284f32de43e56b468fa5113611aa.png";

  for (let i = 0; i < count; i++) {
    const user: User = {
      id: `${i + 1}`,
      name: `User ${i + 1}`,
      profilepicture: profilePicture,
      points: Math.floor(Math.random() * 1000), // Random points between 0 and 999
    };
    users.push(user);
  }

  return users;
};

const data: User[] = generateRandomUserData(50); // Generate 50 random users

const PaginatedTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    if (!isServer) {
      // Generate random user data on the client side
      const randomData = generateRandomUserData(50);
      setData(randomData);
    }
  }, []);
  const totalPages = Math.ceil(data.length / pageSize);

  const startIndex = currentPage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left font-semibold">Rank</th>
            <th className="px-4 py-2 text-left font-semibold">User</th>
            <th className="px-4 py-2 text-left font-semibold">Points</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((user, index) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="px-4 py-2">{startIndex + index + 1}</td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <Image
                    width={100}
                    height={100}
                    src={user.profilepicture}
                    alt={user.name}
                    className="mr-2 h-8 w-8 rounded-full"
                  />
                  {user.name}
                </div>
              </td>
              <td className="px-4 py-2">{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <div>
          Page {currentPage + 1} of {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
