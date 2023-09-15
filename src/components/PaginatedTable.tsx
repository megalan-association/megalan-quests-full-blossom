import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { LeaderboardPageSize } from "~/utils/constants";
import ProfileModal from "./modals/ProfileModal";

interface User {
  id: string;
  name: string | null;
  image: string | null;
  totalPoints: number;
}

type user = {
  id: string;
  name: string;
  points: number;
  rank: number;
  image: string | null;
};

const PaginatedTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<user>();
  const users = api.tasks.getLeaderBoard.useQuery();

  const data: User[] = users.data ?? [];

  const totalPages = Math.ceil(data.length / LeaderboardPageSize);

  const startIndex = currentPage * LeaderboardPageSize;
  const endIndex = Math.min(startIndex + LeaderboardPageSize, data.length);
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const userCell = (
    id: string,
    name: string,
    image: string | null,
    rank: number,
    points: number
  ) => {
    return name.length >= 10 ? (
      <button
        className="flex flex-row items-center space-x-2"
        onClick={() => {
          setShowProfile(true);
          setSelectedUser({
            id,
            name,
            points,
            rank,
            image,
          });
        }}
      >
        {image ? (
          <Image
            width={100}
            height={100}
            src={image}
            alt={name}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-500" />
        )}
        <p>{name.substring(0, 10)}...</p>
      </button>
    ) : (
      <div className="flex flex-row items-center space-x-2">
        {image ? (
          <Image
            width={100}
            height={100}
            src={image}
            alt={name}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-500" />
        )}
        <p>{name}</p>
      </div>
    );
  };

  return (
    <>
      {selectedUser && (
        <ProfileModal
          user={selectedUser}
          isOpen={showProfile}
          closeModal={() => setShowProfile(false)}
        />
      )}
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
                  <td
                    className={`px-4 py-2 ${
                      currentData.length - 1 !== index &&
                      "border-b-2 border-light-pink"
                    }`}
                  >
                    {startIndex + index + 1}
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      currentData.length - 1 !== index &&
                      "border-b-2 border-light-pink"
                    }`}
                  >
                    {userCell(
                      user.id,
                      user.name ?? "user",
                      user.image,
                      startIndex + index + 1,
                      user.totalPoints
                    )}
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      currentData.length - 1 !== index &&
                      "border-b-2 border-light-pink"
                    }`}
                  >
                    {user.totalPoints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
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
        )}
      </div>
    </>
  );
};

export default PaginatedTable;
