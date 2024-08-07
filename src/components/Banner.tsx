import { Dispatch, SetStateAction } from "react";
import { HiOutlineXCircle } from "react-icons/hi2";

type BannerType = {
  title: string;
  message: string;
  onClose: Dispatch<SetStateAction<boolean>>;
};

export const Banner = ({ title, message, onClose }: BannerType) => {
  return (
    <div
      className="flex items-center justify-between rounded-md border-red-900 bg-red-200 p-4 text-red-900"
      role="alertdialog"
      aria-labelledby="title"
      aria-describedby="message"
    >
      <div
        className="flex gap-x-3 focus:outline-none focus-visible:ring focus-visible:ring-red-200 focus-visible:ring-offset-2"
        role="document"
        tabIndex={0}
      >
        <h2 className="font-bold" id="title">
          {title}
        </h2>
        <p id="message">{message}</p>
      </div>
      <button
        onClick={() => onClose(false)}
        className="grid h-6 w-6 place-content-center rounded-full focus:outline-none focus-visible:ring focus-visible:ring-red-200 focus-visible:ring-offset-2"
        aria-label="Close"
      >
        <HiOutlineXCircle className="h-5 w-5" />
      </button>
    </div>
  );
};
