import Image from "next/image";

const ProfileCard = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src="https://images.pexels.com/photos/19858879/pexels-photo-19858879/free-photo-of-brunette-leaning-on-cafe-table-with-coffee.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src="https://images.pexels.com/photos/27383334/pexels-photo-27383334/free-photo-of-fashion-model-in-cropped-checked-blouse.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
          alt=""
          width={48}
          height={48}
          className="rounded-full object-cover w-12 aspect-square absolute left-0 right-0 m-auto -bottom-6 ring-2 ring-white z-10"
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="font-semibold">Md. Shohanur Rahman</span>
        <span className="text-xs text-gray-500">500 Followers</span>
        <button className="bg-blue-500 text-white text-sm p-2 rounded-md">
          My Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
