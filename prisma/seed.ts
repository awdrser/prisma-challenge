import db from "@/lib/db";
import bcrypt from "bcrypt";

async function main() {
  // 개발용: 매번 깨끗하게(선택)
  await db.like.deleteMany();
  await db.tweet.deleteMany();
  // await db.user.deleteMany();

  const hashed = await bcrypt.hash("12345", 12);

  // 유저 5명 생성
  const users = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      db.user.create({
        data: {
          username: `user${i + 1}`,
          email: `user${i + 1}@example.com`,
          password: hashed,
        },
        select: { id: true, username: true },
      })
    )
  );

  // 각 유저당 트윗 5개
  for (const user of users) {
    await db.tweet.createMany({
      data: Array.from({ length: 5 }).map((_, j) => ({
        tweet: `${user.username}의 더미 트윗 ${j + 1}`,
        userId: user.id,
      })),
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
