"use client";

import { acceptFriendRequest, rejectFriendRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type RequestWithUser = FollowRequest & { sender: User };

interface Props {
  requests: RequestWithUser[];
}

const FrinedRequestList = ({ requests }: Props) => {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: number, userId: string) => {
    removeOptimisticRequests(requestId);

    try {
      await acceptFriendRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const reject = async (requestId: number, userId: string) => {
    removeOptimisticRequests(requestId);

    try {
      await rejectFriendRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticRequests, removeOptimisticRequests] = useOptimistic(
    requestState,
    (state, value: number) => state.filter((req) => req.id !== value)
  );

  return (
    <>
      {optimisticRequests.map((request) => (
        <div className="flex items-center justify-between" key={request.id}>
          <div className="flex items-center gap-4">
            <Image
              src={request.sender.avatar || "noAvatar.png"}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
              width={40}
              height={40}
            />
            <span className="font-semibold">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <form action={() => accept(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/accept.png"
                  alt="Accept"
                  className="cursor-pointer"
                  width={20}
                  height={20}
                />
              </button>
            </form>
            <form action={() => reject(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/reject.png"
                  alt="Reject"
                  className="cursor-pointer"
                  width={20}
                  height={20}
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default FrinedRequestList;
