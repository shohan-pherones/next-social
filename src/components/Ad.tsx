import Image from "next/image";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ad</span>
        <Image
          src="/more.png"
          alt="More"
          width={16}
          height={16}
          className="cursor-pointer"
        />
      </div>
      {/* BOTTOM */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/11565646/pexels-photo-11565646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/11565646/pexels-photo-11565646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-blue-500 font-medium">Cybernetic Wears</span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, provident."
            : size === "md"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corrupti, nam magnam earum eum atque!"
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque vero rerum velit fugit hic error alias eum repellendus, totam minima."}
        </p>
        <button className="bg-gray-200 text-gray-500 p-2 rounded-md text-xs">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Ad;
