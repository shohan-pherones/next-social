"use client";

import { deletePost } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";

const PostInfo = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState<boolean>(false);

  const deletePostWithId = deletePost.bind(null, postId);

  return (
    <div className="relative">
      <Image
        src="/more.png"
        alt="More"
        width={16}
        height={16}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute top-5 right-0 bg-white p-5 rounded-lg flex flex-col gap-2 text-sm shadow z-30">
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Repost</span>
          <form action={deletePostWithId}>
            <button className="text-red-500">Delete</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
