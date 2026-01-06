"use client";

import Input from "@/input";
import { useActionState } from "react";
import login from "./actions";

export default function logIn() {
  const [state, action] = useActionState(login, null);
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-4xl mt-10">Log In</h1>
      <form action={action} className="flex flex-col gap-5 items-center">
        <Input
          required
          placeholder="Email"
          name="email"
          type="email"
          errors={state?.fieldErrors.email}
        />
        <Input
          required
          placeholder="Password"
          name="password"
          type="password"
          errors={state?.fieldErrors.password}
        />
        <button className="w-1/2 bg-sky-500 text-white text-lg font-medium py-2.5 rounded-md text-center hover:bg-sky-400 transition-colors">
          Log In
        </button>
      </form>
    </div>
  );
}
