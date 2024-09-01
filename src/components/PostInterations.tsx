"use client";

import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

interface Props {
  postId: number;
  likes: string[];
  commentNumber: number;
}

const PostInterations = ({ postId, likes, commentNumber }: Props) => {
  const { userId, isLoaded } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");

    try {
      await switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        {/* LIKE */}
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-md">
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                alt="Like"
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </button>
          </form>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {optimisticLike.likeCount}
            <span className="hidden md:inline ml-2">Likes</span>
          </span>
        </div>
        {/* COMMENT */}
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-md">
          <Image
            src="/comment.png"
            alt="Comment"
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            15<span className="hidden md:inline ml-2">Comments</span>
          </span>
        </div>
      </div>
      {/* SHARE */}
      <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-md cursor-pointer">
        <Image src="/share.png" alt="Share" width={16} height={16} />
        <span className="text-gray-300">|</span>
        <span className="text-gray-500">Share</span>
      </div>
    </div>
  );
};

export default PostInterations;
