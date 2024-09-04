"use client";

import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );

  const add = async () => {
    if (!user || !desc) return null;

    addOptimisticComment({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Commenting...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* WRITE */}
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "/noAvatar.png"}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover"
            width={32}
            height={32}
          />
          <form
            action={add}
            className="flex-1 flex items-center justify-between bg-slate-100 rounded-md text-sm px-4 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              src="/emoji.png"
              alt="Emoji"
              className="cursor-pointer"
              width={16}
              height={16}
            />
          </form>
        </div>
      )}
      {/* COMMENTS */}
      <div>
        {/* COMMENT */}
        {optimisticComments.map((comment) => (
          <div key={comment.id} className="flex gap-4 justify-between mt-6">
            {/* AVATAR */}
            <Image
              src={comment.user.avatar || "/noAvatar.png"}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
              width={40}
              height={40}
            />
            {/* DESC. */}
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p>{comment.desc}</p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/like.png"
                    alt="Like"
                    width={12}
                    height={12}
                    className="cursor-pointer w-4 h-4"
                  />
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">0 Likes</span>
                </div>
                <div className="cursor-pointer">Reply</div>
              </div>
            </div>
            {/* ICON */}
            <Image
              src="/more.png"
              alt="More"
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
