"use server";

import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import z from "zod";
import db from "../../lib/db";

const checkConfirmPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => {
  if (password === confirmPassword) {
    return true;
  } else {
    return false;
  }
};

const schema = z
  .object({
    username: z.string().min(2),
    email: z.email().toLowerCase().trim(),
    password: z.string().min(5),
    confirmPassword: z.string(),
  })
  .superRefine(async (data, ctx) => {
    const checkUniqueUsername = await db.user.findUnique({
      where: { username: data.username },
      select: { username: true },
    });
    const checkUniqueEmail = await db.user.findUnique({
      where: { email: data.email },
      select: { email: true },
    });

    if (checkUniqueUsername) {
      ctx.addIssue({
        code: "custom",
        message: "이름이 이미 존재합니다.",
        path: ["usename"],
      });
      return;
    }
    if (checkUniqueEmail) {
      ctx.addIssue({
        code: "custom",
        message: "이메일이 이미 존재합니다.",
        path: ["email"],
      });
      return;
    }
  })
  .refine(checkConfirmPassword, {
    error: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await schema.safeParseAsync(data);

  if (!result.success) {
    const flatten = z.flattenError(result.error);
    return { fieldErrors: flatten.fieldErrors };
  } else {
    const HashPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: HashPassword,
      },
      select: { id: true },
    });
    const session = await getSession();
    //@ts-ignore
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}
