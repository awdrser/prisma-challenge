import { toLocalDateOrTimeString } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface TweetProps {
  id: number;
  tweet: string;
  created_at: Date;
  user: { username: string };
}

export default function ListTweet({
  tweet,
  id,
  created_at,
  user: { username },
}: TweetProps) {
  return (
    <Link href={`/tweets/${id}`}>
      <div className="flex flex-col border border-gray-600 px-5 py-2 border-b-0 last:border-b">
        <div className="flex gap-5 items-center">
          <span>{username}</span>
          <span className="text-gray-500">
            {toLocalDateOrTimeString(created_at)}
          </span>
        </div>
        <span>{tweet}</span>
        <button className="mt-2">
          <HeartIcon className="h-6 w-6 text-gray-500 hover:text-gray-400" />
        </button>
      </div>
    </Link>
  );
}
