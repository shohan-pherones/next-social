import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import UserInfoCardInteractions from "./UserInfoCardInteractions";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isBlocked = false;
  let isFollowing = false;
  let isFriendRequestSent = false;

  const { userId: currentUserId } = auth();

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });

    blockRes ? (isBlocked = true) : (isBlocked = false);

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    followRes ? (isFollowing = true) : (isFollowing = false);

    const friendRequestRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });

    friendRequestRes
      ? (isFriendRequestSent = true)
      : (isFriendRequestSent = false);
  }

  if (!currentUserId) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Details</span>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex flex-col gap-0">
          <span className="text-xl text-black">
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        {user.description && <p>{user.description}</p>}
        {user.city && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" alt="Map" width={16} height={16} />
            <span>
              Lives in <b>{user.city}</b>
            </span>
          </div>
        )}
        {user.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="School" width={16} height={16} />
            <span>
              Went to <b>{user.school}</b>
            </span>
          </div>
        )}
        {user.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="Work" width={16} height={16} />
            <span>
              Works at <b>{user.work}</b>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          {user.website && (
            <div className="flex gap-2 items-center">
              <Image src="/link.png" alt="Link" width={16} height={16} />
              <Link
                href={user.website}
                target="_blank"
                className="text-blue-500 font-medium"
              >
                {user.website}
              </Link>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <Image src="/date.png" alt="Date" width={16} height={16} />
            <span>Joined {formattedDate}</span>
          </div>
        </div>
        <UserInfoCardInteractions
          userId={user.id}
          currentUserId={currentUserId}
          isBlocked={isBlocked}
          isFollowing={isFollowing}
          isFriendRequestSent={isFriendRequestSent}
        />
      </div>
    </div>
  );
};

export default UserInfoCard;
