import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Image from "next/image";
import Ad from "./Ad";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <div className="p-4 bg-white rounded-lg shadow text-sm text-gray-500 flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-slate-100"
        >
          <Image src="/posts.png" alt="Post" width={20} height={20} />
          <span>My Posts</span>
        </Link>
        <hr className="border-t border-gray-100 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-slate-100"
        >
          <Image src="/activity.png" alt="Activity" width={20} height={20} />
          <span>Activities</span>
        </Link>
        <hr className="border-t border-gray-100 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-slate-100"
        >
          <Image src="/market.png" alt="Marketplace" width={20} height={20} />
          <span>Marketplace</span>
        </Link>
        <hr className="border-t border-gray-100 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-slate-100"
        >
          <Image src="/events.png" alt="Events" width={20} height={20} />
          <span>Events</span>
        </Link>
        <hr className="border-t border-gray-100 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-slate-100"
        >
          <Image src="/albums.png" alt="Albums" width={20} height={20} />
          <span>Albums</span>
        </Link>
        <hr className="border-t border-gray-100 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-slate-100"
        >
          <Image src="/videos.png" alt="Videos" width={20} height={20} />
          <span>Videos</span>
        </Link>
        <hr className="border-t border-gray-100 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-slate-100"
        >
          <Image src="/news.png" alt="News" width={20} height={20} />
          <span>News</span>
        </Link>
        <hr className="border-t border-gray-100 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-slate-100"
        >
          <Image src="/courses.png" alt="Courses" width={20} height={20} />
          <span>Courses</span>
        </Link>
        <hr className="border-t border-gray-100 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-slate-100"
        >
          <Image src="/lists.png" alt="Lists" width={20} height={20} />
          <span>Lists</span>
        </Link>
        <hr className="border-t border-gray-100 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-md hover:bg-slate-100"
        >
          <Image src="/settings.png" alt="Settings" width={20} height={20} />
          <span>Settings</span>
        </Link>
      </div>
      <Ad size="sm" />
    </div>
  );
};

export default LeftMenu;
