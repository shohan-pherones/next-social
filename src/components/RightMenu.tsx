import { User } from "@prisma/client";
import Ad from "./Ad";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user && (
        <>
          <Suspense
            fallback={
              <LoaderCircle className="w-5 h-5 text-blue-500 animate-spin" />
            }
          >
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense
            fallback={
              <LoaderCircle className="w-5 h-5 text-blue-500 animate-spin" />
            }
          >
            <UserMediaCard user={user} />
          </Suspense>
        </>
      )}
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};

export default RightMenu;
