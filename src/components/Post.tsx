import Image from "next/image";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import Link from "next/link";

type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & {
  _count: { comments: number };
};

const Post = ({ post }: { post: FeedPostType }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          <Link href={`/profile/${post.user.username}`}>
            <span className="font-medium">
              {post.user.name && post.user.surname
                ? post.user.name + " " + post.user.surname
                : post.user.username}
            </span>
          </Link>
        </div>
        <Image
          src="/more.png"
          alt="More"
          width={16}
          height={16}
          className="cursor-pointer"
        />
      </div>
      {/* DESC. */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              alt={post.desc}
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* INTERACTIONS */}
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          {/* LIKE */}
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-md">
            <Image
              src="/like.png"
              alt="Like"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              100<span className="hidden md:inline ml-2">Likes</span>
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
      <Comments />
    </div>
  );
};

export default Post;
