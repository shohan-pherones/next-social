import Image from "next/image";
import Link from "next/link";

const UserInfoCard = ({ userId }: { userId: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Details</span>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex flex-col gap-0">
          <span className="text-xl text-black">Md. Shohanur Rahman</span>
          <span className="text-sm">@spectra.shohan</span>
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius,
          molestias!
        </p>
        <div className="flex items-center gap-2">
          <Image src="/map.png" alt="Map" width={16} height={16} />
          <span>
            Lives in <b>Dhaka, Bangladesh</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/school.png" alt="School" width={16} height={16} />
          <span>
            Went to <b>Stamford University Bangladesh</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/work.png" alt="Work" width={16} height={16} />
          <span>
            Works at <b>Javapple Inc.</b>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Image src="/link.png" alt="Link" width={16} height={16} />
            <Link
              href="https://shohan.vercel.app"
              target="_blank"
              className="text-blue-500 font-medium"
            >
              Porfolio
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <Image src="/date.png" alt="Date" width={16} height={16} />
            <span>Joined Nov, 2023</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2 font-medium">
          Add Friend
        </button>
        <button className="bg-rose-50 text-rose-500 text-sm rounded-md p-2 font-medium">
          Block
        </button>
      </div>
    </div>
  );
};

export default UserInfoCard;
