"use client";

import { triggerBlock, triggerFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

interface Props {
  userId: string;
  isBlocked: boolean;
  isFollowing: boolean;
  isFriendRequestSent: boolean;
}

const UserInfoCardInteractions = ({
  userId,
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
    switchOptimisticState("follow");

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

  const block = async () => {
    switchOptimisticState("block");

    try {
      await triggerBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            friendRequestSent:
              !state.following && !state.friendRequestSent ? true : false,
          }
        : {
            ...state,
            blocked: !state.blocked,
          }
  );

  return (
    <>
      <form action={follow}>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2 font-medium w-full">
          {optimisticState.following
            ? "Following"
            : optimisticState.friendRequestSent
            ? "Follow Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action={block}>
        <button className="bg-rose-50 text-rose-500 text-sm rounded-md p-2 font-medium w-full">
          {optimisticState.blocked ? "Unblock" : "Block"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteractions;
