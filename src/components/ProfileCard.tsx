import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  if (!user) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src={user?.cover || "/noCover.png"}
          alt="Cover"
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user.avatar || "noAvatar.png"}
          alt="Avatar"
          width={48}
          height={48}
          className="rounded-full object-cover w-12 aspect-square absolute left-0 right-0 m-auto -bottom-6 ring-2 ring-white z-10"
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="font-semibold">
          {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username}
        </span>
        <span className="text-xs text-gray-500">
          {user._count.followers} Followers
        </span>
        <Link href={`/profile/${user.username}`}>
          <button className="bg-blue-500 text-white text-sm p-2 rounded-md">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
