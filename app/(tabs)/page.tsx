import ListTweet from "@/components/tweet-list";
import db from "@/lib/db";

async function getInitialTweets() {
  const tweets = db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: { created_at: "desc" },
    take: 10,
  });
  return tweets;
}
export type InitialTweets = Awaited<ReturnType<typeof getInitialTweets>>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  return (
    <div className="mx-auto max-w-screen-sm">
      <div className="h-20 border border-gray-600 border-b-0 px-5">
        <h2 className="text-2xl mt-2">Home</h2>
      </div>
      <ListTweet initialTweets={initialTweets}></ListTweet>
    </div>
  );
}
