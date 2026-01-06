import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) return user;
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logout = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col items-center gap-5">
      <h1>Profile</h1>
      <div>
        <h2>{user?.username}</h2>
        <p>{user?.email}</p>
      </div>
      <form action={logout}>
        <button>Log Out</button>
      </form>
    </div>
  );
}
