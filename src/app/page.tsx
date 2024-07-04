"use client";
import { useState } from "react";
import BaseDialog from "./components/dialog/BaseDialog";
import Link from "next/link";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="[&>*:not(:last-child)]:mb-3">
      <p className="text-lg">
        Hi, Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className="grid gap-1">
        <label htmlFor="secretKey" className="font-semibold">
          Secret key
        </label>
        <input
          id="secretKey"
          type="text"
          placeholder="Enter your secret key"
          className="px-4 py-2 border border-[#ccc] rounded-lg text-sm"
        />
      </div>
      <button
        className="px-6 py-2 bg-blue-500 text-white text-base rounded-xl font-medium"
        onClick={() => setOpen(true)}
      >
        Start
      </button>
      <BaseDialog
        open={open}
        closeIcon={false}
        onOpenChange={setOpen}
        className="w-[500px]"
      >
        <div>
          <p className="text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="flex items-center gap-4 justify-center mt-10">
            <button
              className="px-6 py-2 bg-red-500 text-white text-sm rounded-lg font-medium w-[110px]"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <Link
              href="/quiz"
              className="px-6 py-2 bg-blue-500 text-white text-sm rounded-lg font-medium w-[110px]"
            >
              Continue
            </Link>
          </div>
        </div>
      </BaseDialog>
    </div>
  );
}
