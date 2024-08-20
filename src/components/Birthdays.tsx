import Image from "next/image";
import Link from "next/link";

const Birthdays = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Birthdays</span>
      </div>
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/27540338/pexels-photo-27540338/free-photo-of-a-woman-in-a-white-dress-is-leaning-on-a-log.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
            alt=""
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          <span className="font-semibold">Esha Rehman</span>
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white text-xs rounded-md p-2">
            Celebrate
          </button>
        </div>
      </div>
      {/* UPCOMING */}
      <div className="p-4 bg-slate-100 rounded-md flex items-center gap-4">
        <Image src="/gift.png" alt="Gift" width={24} height={24} />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray-500">
            See other 12 have upcoming birthdays
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
