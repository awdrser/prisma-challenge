"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TabBar() {
  const router = useRouter();

  return (
    <div className=" absolute left-0 flex flex-col gap-7 items-center xl:w-[650px] pt-10 ">
      <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>

      <div className="flex gap-2">
        <button className="hover:cursor-pointer" onClick={() => router.back()}>
          <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
        </button>

        <button
          className="hover:cursor-pointer"
          onClick={() => router.forward()}
        >
          <ArrowRightIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
