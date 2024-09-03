"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-blue-500 p-2 rounded-md text-white mt-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? (
        <span className="flex gap-2 items-center">
          <LoaderCircle className="w-5 h-5 text-blue-500 animate-spin" />{" "}
          Posting
        </span>
      ) : (
        "Post"
      )}
    </button>
  );
};

export default AddPostButton;
