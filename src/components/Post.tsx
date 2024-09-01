import Image from "next/image";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import Link from "next/link";
import PostInterations from "./PostInterations";

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
      <PostInterations
        postId={post.id}
        likes={post.likes.map((like) => like.userId)}
        commentNumber={post._count.comments}
      />
      <Comments postId={post.id} />
    </div>
  );
};

export default Post;
