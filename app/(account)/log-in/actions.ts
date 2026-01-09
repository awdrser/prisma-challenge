"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import z from "zod";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .email()
    .toLowerCase()
    .trim()
    .refine(checkEmailExists, "이메일이 존재하지 않습니다."),
  password: z.string(),
  //.min(PASSWORD_MIN_LENGTH)
  //.regex(PASSWORD_REGEX, "특수기호가 포함되어야 합니다."),
});

export default async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    const flatten = z.flattenError(result.error);
    return { fieldErrors: flatten.fieldErrors };
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const passwordIsOk = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxx"
    );

    if (passwordIsOk) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: { email: [], password: ["잘못된 비밀번호입니다."] },
      };
    }
  }
}
