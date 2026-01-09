import db from "@/lib/db";
import { toLocalDateOrTimeString } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}
async function getTweet(id: number) {
  const tweet = db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      created_at: true,
      updated_at: true,
      tweet: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweet;
}

export default async function Tweet({ params }: Props) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  const tweet = await getTweet(id);
  if (!tweet) notFound();
  return (
    <div className="flex flex-col border border-gray-600 px-5 py-2 w-1/2 mx-auto">
      <div className="flex gap-5">
        <span>{tweet.user.username}</span>
        <span>{toLocalDateOrTimeString(tweet.created_at)}</span>
        <span>
          {tweet.created_at.getTime() !== tweet.updated_at.getTime()
            ? `updated at ${toLocalDateOrTimeString(tweet.updated_at)}`
            : null}
        </span>
      </div>
      <span>{tweet.tweet}</span>
      <button className="mt-2">
        <HeartIcon className="h-6 w-6 text-gray-500 hover:text-gray-400" />
      </button>
    </div>
  );
}
