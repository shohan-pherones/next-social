"use client";

import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>("");

  if (!user) return null;

  if (!isLoaded) {
    return <LoaderCircle className="w-5 h-5 text-blue-500 animate-spin" />;
  }

  return (
    <div className="p-4 bg-white rounded-lg flex gap-4 justify-between text-sm shadow">
      {/* AVATAR */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt="Avatar"
        className="w-12 h-12 object-cover rounded-full"
        width={48}
        height={48}
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form
          action={(formData) => addPost(formData, img.secure_url || "")}
          className="flex gap-4"
        >
          <textarea
            placeholder="What's on your mind?"
            className="bg-slate-100 rounded-md flex-1 px-4 py-2 outline-none"
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div>
            <Image
              src="/emoji.png"
              alt="Emoji"
              className="w-5 h-5 cursor-pointer self-end"
              width={20}
              height={20}
            />
            <AddPostButton />
          </div>
        </form>
        {/* POST OPTION */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="next-social"
            onSuccess={(result, { widget }) => {
              setImg(result.info), widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <Image
                    src="/addimage.png"
                    alt="Add image"
                    width={20}
                    height={20}
                  />
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="Add video" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="Add poll" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="Add event" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
