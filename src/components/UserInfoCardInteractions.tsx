"use client";

interface Props {
  userId: string;
  currentUserId: string;
  isBlocked: boolean;
  isFollowing: boolean;
  isFriendRequestSent: boolean;
}

const UserInfoCardInteractions = ({
  userId,
  currentUserId,
  isBlocked,
  isFollowing,
  isFriendRequestSent,
}: Props) => {
  return (
    <>
      <form action="">
        <button className="bg-blue-500 text-white text-sm rounded-md p-2 font-medium w-full">
          {isFollowing
            ? "Following"
            : isFriendRequestSent
            ? "Friend Request Sent"
            : "Add Friend"}
        </button>
      </form>
      <form action="">
        <button className="bg-rose-50 text-rose-500 text-sm rounded-md p-2 font-medium w-full">
          {isBlocked ? "Unblock" : "Block"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteractions;
