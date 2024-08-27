"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            action={updateProfile}
            className="p-12 bg-white rounded-lg shadow flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            <h2 className="text-xl">Update Profile</h2>
            <p className="text-xs text-gray-500">
              Use the navbar profile to change the avatar or username
            </p>
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="">Cover Photo</label>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={user.cover || "noCover.png"}
                  alt="Cover"
                  width={48}
                  height={32}
                  className="w-12 h-8 rounded-md object-cover"
                />
                <span className="text-xs underline text-gray-600">Change</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={user.name || "John"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  Last Name
                </label>
                <input
                  type="text"
                  name="surname"
                  placeholder={user.surname || "Doe"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  Bio
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder={user.description || "Something about you..."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  Address
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder={user.city || "123, Main Street, NY"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  School
                </label>
                <input
                  type="text"
                  name="school"
                  placeholder={user.school || "MIT"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  Work
                </label>
                <input
                  type="text"
                  name="work"
                  placeholder={user.work || "Google Inc."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  placeholder={user.website || "example.com"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>
            </div>
            <button className="bg-blue-500 p-2 mt-4 rounded-md text-white">
              Update
            </button>
            <X
              onClick={handleClose}
              className="absolute right-3 top-3 cursor-pointer"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
