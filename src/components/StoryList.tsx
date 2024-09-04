"use client";

import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { Plus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type StoryWithUser = Story & {
  user: User;
};

const StoryList = ({
  stories,
  userId,
}: {
  stories: StoryWithUser[];
  userId: string;
}) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>(null);

  const { user } = useUser();

  const add = async () => {
    if (!img?.secure_url) return null;

    addOptimisticStory({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: userId,
      user: {
        id: userId,
        username: "Posting...",
        avatar: user?.imageUrl || "/noAvatar.png",
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
      const createdStory = await addStory(img.secure_url);
      setStoryList((prev) => [createdStory, ...prev]);
      setImg(null);
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  console.log(stories);

  return (
    <div className="flex gap-8 w-max">
      <CldUploadWidget
        uploadPreset="next-social"
        onSuccess={(result, { widget }) => {
          setImg(result.info), widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-2">
              <div onClick={() => open()} className="cursor-pointer relative">
                <Image
                  src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full ring-4 ring-blue-400 object-cover"
                  width={80}
                  height={80}
                />
                {!img && (
                  <span className="absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded-full bg-black/50 flex items-center justify-center">
                    <Plus size={48} className="text-gray-200" />
                  </span>
                )}
              </div>
              {img ? (
                <form action={add}>
                  <button className="text-xs bg-blue-500 p-2 rounded-md text-white">
                    Add
                  </button>
                </form>
              ) : (
                <span className="font-medium">Add a Story</span>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
      {optimisticStories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <Image
            src={story.img}
            alt="Avatar"
            className="w-20 h-20 rounded-full ring-4 ring-blue-400 object-cover"
            width={80}
            height={80}
          />
          <span className="font-medium">
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
