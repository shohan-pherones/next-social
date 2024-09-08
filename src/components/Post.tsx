import Image from "next/image";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import Link from "next/link";
import PostInterations from "./PostInterations";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import PostInfo from "./PostInfo";

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
        <PostInfo postId={post.id} />
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
      <Suspense
        fallback={
          <LoaderCircle className="w-5 h-5 text-blue-500 animate-spin" />
        }
      >
        <PostInterations
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
      </Suspense>
      <Suspense
        fallback={
          <LoaderCircle className="w-5 h-5 text-blue-500 animate-spin" />
        }
      >
        <Comments postId={post.id} />
      </Suspense>
    </div>
  );
};

export default Post;
