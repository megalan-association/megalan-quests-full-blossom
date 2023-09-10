import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfileCard = () => {
  const { data: session } = useSession();
  if (!(session && session.user)) return <></>;

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="h-20 w-20 flex-shrink-0 rounded-full bg-gradient-to-br from-pink/40 to-pink/80 p-1 drop-shadow-lg">
        {session.user.image ? (
          <Image
            alt="society logo"
            src={session.user.image}
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
          {session.user.name}
        </h2>
        <p className="font-body text-base font-medium text-brown">
          {session.user.type}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
