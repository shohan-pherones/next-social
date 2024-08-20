import Image from "next/image";

const Comments = () => {
  return (
    <div>
      {/* WRITE */}
      <div className="flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/2760246/pexels-photo-2760246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="w-8 h-8 rounded-full object-cover"
          width={32}
          height={32}
        />
        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-md text-sm px-4 py-2 w-full">
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent outline-none flex-1"
          />
          <Image
            src="/emoji.png"
            alt="Emoji"
            className="cursor-pointer"
            width={16}
            height={16}
          />
        </div>
      </div>
      {/* COMMENTS */}
      <div>
        {/* COMMENT */}
        <div className="flex gap-4 justify-between mt-6">
          {/* AVATAR */}
          <Image
            src="https://images.pexels.com/photos/2760246/pexels-photo-2760246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          {/* DESC. */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Minnie James</span>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
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
                <span className="text-gray-500">5 Likes</span>
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
      </div>
    </div>
  );
};

export default Comments;
