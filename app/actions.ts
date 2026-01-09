"use server";

import db from "@/lib/db";

export async function getMoreTweets(page: number) {
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
    skip: page * 10,
    take: 10,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}
