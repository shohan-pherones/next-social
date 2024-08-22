"use client";

import { triggerFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

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
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isBlocked,
    friendRequestSent: isFriendRequestSent,
  });

  const follow = async () => {
    switchOptimisticFollow("");

    try {
      await triggerFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        friendRequestSent:
          !prev.following && !prev.friendRequestSent ? true : false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
    userState,
    (state) => ({
      ...state,
      following: state.following && false,
      friendRequestSent:
        !state.following && !state.friendRequestSent ? true : false,
    })
  );

  return (
    <>
      <form action={follow}>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2 font-medium w-full">
          {optimisticFollow.following
            ? "Following"
            : optimisticFollow.friendRequestSent
            ? "Friend Request Sent"
            : "Add Friend"}
        </button>
      </form>
      <form action="">
        <button className="bg-rose-50 text-rose-500 text-sm rounded-md p-2 font-medium w-full">
          {optimisticFollow.blocked ? "Unblock" : "Block"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteractions;
